"use client";

import { RenderHeadings } from "../components/RenderHeadings";
import * as css from "./TableOfContentsContainer.css";
import { processHeadings } from "../util/processHeadings";
import { TraversableBlock } from "features/notion/types";

export function TableOfContentsContainer({
  blocks,
}: {
  blocks: TraversableBlock[];
}) {
  const headings = processHeadings(blocks);

  return (
    headings.length > 0 && (
      <aside className={css.aside}>
        <div className={css.frame}>
          <h2 className={css.title}>목차</h2>
          <div className={css.tocFrame}>
            <RenderHeadings headings={headings} />
          </div>
        </div>
      </aside>
    )
  );
}
