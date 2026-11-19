import type { NotionComponentProps } from 'features/notion/types'
import { useRef, useState } from 'react'
import { getPlainText } from '../richText/getPlainText'
import { getImgUrl } from './getImgUrl'
import * as css from './NotionImg.css'

export function NotionImg({ block }: NotionComponentProps<'image'>) {
  const imgUrl = getImgUrl(block)
  const caption = getPlainText(block.image.caption)
  const dialog = useRef<HTMLDialogElement>(null)
  const [size, setSize] = useState({ width: 400, height: 300 })

  if (!imgUrl) return null

  return (
    <>
      <button type="button" className={css.figureWrapper} onClick={() => dialog.current?.showModal()} aria-label={caption || '이미지 확대'}>
        <figure className={css.figureDefault}>
          <img
            className={css.imgDefault}
            src={imgUrl}
            alt={caption}
            {...size}
            loading="lazy"
            onLoad={({ currentTarget: image }) => {
              const scale = image.naturalHeight >= 400 ? 2 : 1
              setSize({ width: image.naturalWidth / scale, height: image.naturalHeight / scale })
            }}
          />
          {caption && <figcaption className={css.figcaption}>{caption}</figcaption>}
        </figure>
      </button>
      <dialog ref={dialog} className={css.imageDialog} aria-label={caption || '확대 이미지'}>
        <button type="button" className={css.figureWrapper} onClick={() => dialog.current?.close()} aria-label="확대 이미지 닫기">
          <figure className={css.figureZoomed}>
            <img className={css.imgZoomed} src={imgUrl} alt={caption} {...size} loading="lazy" />
            {caption && <figcaption className={css.figcaptionZoomed}>{caption}</figcaption>}
          </figure>
        </button>
      </dialog>
    </>
  )
}
