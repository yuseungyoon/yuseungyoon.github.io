export function clamp(min: number, prefer: number, max: number) {
  if (typeof min !== 'number' || typeof prefer !== 'number' || typeof max !== 'number') throw new Error('숫자 타입을 제공하세요')

  const MIN = Math.min(min, max)
  const MAX = Math.max(min, max)

  return Math.max(MIN, Math.min(MAX, prefer))
}
