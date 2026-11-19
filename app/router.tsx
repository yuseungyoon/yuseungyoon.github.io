import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  return createRouter({
    routeTree,
    scrollRestoration: true,
    parseSearch: search => Object.fromEntries(new URLSearchParams(search)),
    stringifySearch: search => {
      const params = new URLSearchParams()
      for (const [name, value] of Object.entries(search)) {
        if (typeof value === 'string') params.set(name, value)
      }
      const query = params.toString()
      return query ? `?${query}` : ''
    },
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
