'use client'
import { postGroupByYearAtom, yearsAtom } from 'features/postList/postList.atom'
import { useAtomValue } from 'jotai'
import Link from 'next/link'
import type { ComponentProps } from 'react'
import * as css from './HamburgerMenu.css'

export function HamburgerMenu({ onClose }: { onClose: () => void } & ComponentProps<'ul'>) {
  const YEAR_GROUPED_POSTS = useAtomValue(postGroupByYearAtom)
  const YEARS = useAtomValue(yearsAtom)

  return (
    <div className={css.hamburgerMenuFrame}>
      <div className={css.title}>모든 글</div>
      <ul className={css.menuList}>
        {YEARS.map(y => (
          <li key={y}>
            <div className={css.groupTitle}>{y}</div>
            <ul className={css.articleList}>
              {YEAR_GROUPED_POSTS[y].map(p => (
                <li key={p.id} className={css.articleListRow}>
                  <Link key={p.id} href={`/${y}/${p.slug}`} onClick={() => onClose()}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
