import type { ExtendedImageBlockObjectResponse } from 'features/notion/types'

export const getImgUrl = (block: ExtendedImageBlockObjectResponse): string => {
  const { image } = block
  if (image.cached_url) return image.cached_url
  return (image.type === 'external' ? image.external?.url : image.file?.url) ?? ''
}
