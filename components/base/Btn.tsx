import type { ComponentProps } from 'react'
import * as css from './Btn.css'

export function Btn({ className, ...props }: ComponentProps<'button'>) {
  return <button className={className ? `${css.base} ${className}` : css.base} {...props} />
}

export function CancelBtn({ ...props }: ComponentProps<'button'>) {
  return <Btn className={css.cancel} {...props} />
}

export function PrimaryBtn({ ...props }: ComponentProps<'button'>) {
  return <Btn className={css.primary} {...props} />
}
