import { Client } from '@notionhq/client'
import type { ClientOptions } from '@notionhq/client/build/src/Client'

const MIN_INTERVAL_MS = 350
const MAX_RETRIES = 6
const REQUEST_TIMEOUT_MS = 15_000
const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

let nextSlot = 0
let requestCount = 0
export const getRequestCount = () => requestCount

async function waitForSlot() {
  while (nextSlot > Date.now()) await sleep(nextSlot - Date.now())
  nextSlot = Date.now() + MIN_INTERVAL_MS
}

const throttledFetch: NonNullable<ClientOptions['fetch']> = async (url, init) => {
  for (let attempt = 0; ; attempt++) {
    await waitForSlot()
    requestCount++
    let response: Response
    try {
      response = await fetch(url, { ...init, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) })
    } catch (error) {
      if (attempt >= MAX_RETRIES) throw error
      console.warn(`Notion network error, retry ${attempt + 1}/${MAX_RETRIES}`)
      await sleep(1000 * 2 ** attempt)
      continue
    }

    const retryable = response.status === 429 || response.status >= 500
    if (!retryable || attempt >= MAX_RETRIES) return response

    const retryAfter = Number(response.headers.get('retry-after'))
    const delay = retryAfter > 0 && Number.isFinite(retryAfter) ? retryAfter * 1000 : 1000 * 2 ** attempt
    console.warn(`Notion HTTP ${response.status}, retry ${attempt + 1}/${MAX_RETRIES} after ${delay}ms`)
    if (response.status === 429) nextSlot = Math.max(nextSlot, Date.now() + delay)
    await response.body?.cancel()
    await sleep(delay)
  }
}

export const getNotionClient = (auth: string) => new Client({ auth, fetch: throttledFetch, timeoutMs: 180_000 })
