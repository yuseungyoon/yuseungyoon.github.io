import { style } from "@vanilla-extract/css";
import { tocBreakpoint } from "app/(routes)/[year]/[slug]/page.css";
import { dp } from "styles/dp";
import { color } from "styles/vars/color.css";
import { layouts } from "styles/vars/layouts.css";

export const postListFrame = style({
  paddingInline: layouts.full,
  paddingBottom: dp(40),
  paddingTop: dp(12),
  maxWidth: layouts.width,
  marginInline: "auto",
});

export const viewLink = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const postLinkFrame = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  listStyleType: "none",
  borderBottom: `1px solid ${color.background_opacity95}`,
  color: color.text,
  "@media": {
    "(hover: hover) and (pointer: fine)": {
      ":hover": {
        backgroundColor: color.text,
        color: color.text_invert,
      },
    },
  },
});

export const postLinkInner = style({
  display: "flex",
  width: "100%",

  flexDirection: "column",
  alignItems: "flex-start",
  paddingBlock: dp(4),
  gap: dp(2),
  border: "1px solid transparent",
  "@media": {
    [tocBreakpoint]: {
      flexDirection: "row",
      alignItems: "center",
    },
  },
});

const postLinkTitleBase = style({
  fontSize: dp(7),
  fontFamily: '"Mona Sans", "Pretendard", sans-serif',
  width: "100%",
  fontWeight: 400,
  lineHeight: 1,
  color: "inherit",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const postLinkTitle = style([
  postLinkTitleBase,
  {
    lineHeight: 1.1,
    display: "inline-block",
    color: "inherit",
  },
]);

export const postLinkDate = style({
  display: "block",
  fontSize: dp(3),
  fontFamily: '"Google Sans Code", monospace',
  fontWeight: 400,
  lineHeight: 1.1,
  color: "inherit",
});

export const postTitleRow = style({
  paddingBlock: dp(1),
  display: "flex",
  color: color.text,
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  gap: dp(13.5),
});
