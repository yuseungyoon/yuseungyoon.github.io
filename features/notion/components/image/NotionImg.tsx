'use client'
import type { NotionComponentProps } from 'features/notion/types'
import { default as Img } from 'next/image'
import { overlay } from 'overlay-kit'
import { useEffect, useState } from 'react'
import { getPlainText } from '../richText/getPlainText'
import { getImgUrl } from './getImgUrl'
import * as css from './NotionImg.css'

export function NotionImg({ block }: NotionComponentProps<'image'>) {
  const imgUrl = getImgUrl(block)
  const [[width, height], setImgSize] = useState<[number, number]>([400, 300])
  const [_, setZoomed] = useState<boolean>(false)

  useEffect(() => {
    if (!imgUrl) return
    const img = new Image()
    img.src = imgUrl
    img.onload = () => {
      if (img.height >= 400) setImgSize([img.width / 2, img.height / 2])
      else setImgSize([img.width, img.height])
    }
  }, [imgUrl])

  if (!imgUrl) return null

  const handleZoomImg = () => {
    setZoomed(true)
    overlay.open(({ unmount }) => (
      <button
        type="button"
        onClick={() => {
          setZoomed(false)
          unmount()
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            setZoomed(false)
            unmount()
          }
        }}
        className={css.figureWrapper}
      >
        <figure className={css.figureZoomed}>
          <Img
            className={css.imgZoomed}
            unoptimized
            key={imgUrl}
            blurDataURL={block.blurDataURL}
            src={imgUrl}
            alt={getPlainText(block?.image?.caption)}
            priority
            width={width}
            height={height}
          />
          {block.image.caption.length > 0 && <figcaption className={css.figcaptionZoomed}>{getPlainText(block.image.caption)}</figcaption>}
        </figure>
      </button>
    ))
  }

  return (
    <button
      type="button"
      onClick={() => handleZoomImg()}
      className={css.figureWrapper}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleZoomImg()
        }
      }}
    >
      <figure className={css.figureDefault}>
        <Img
          className={css.imgDefault}
          unoptimized
          key={imgUrl}
          src={imgUrl}
          alt={getPlainText(block?.image?.caption)}
          priority
          width={width}
          height={height}
        />
        {block.image.caption && <figcaption className={css.figcaption}>{getPlainText(block.image.caption)}</figcaption>}
      </figure>
    </button>
  )
}
