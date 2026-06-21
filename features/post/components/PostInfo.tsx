"use client";
import type { PostIndex } from "features/notion/types";
import * as css from "./PostInfo.css";

export function PostInfo({ meta }: { meta: PostIndex }) {
  return (
    <div className={css.postInfoFrame}>
      <span className={css.postInfoText}>{meta.date}</span>
      <span className={css.postInfoText}>{meta.summary}</span>
    </div>
  );
}
