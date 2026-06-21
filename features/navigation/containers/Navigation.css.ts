import { style } from "@vanilla-extract/css";
import { dp } from "styles/dp";
import { color } from "styles/vars/color.css";
import { layouts } from "styles/vars/layouts.css";

export const container = style({
  zIndex: 99,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  paddingBottom: "env(safe-area-inset-bottom)",
  transform: "translateY(0)",
});

export const frame = style({
  backgroundColor: "transparent",
  color: color.notion_default,
  flexDirection: "row",
  display: "flex",
  maxWidth: layouts.width,
  justifyContent: "space-between",
  borderTop: "none",
  height: dp(12),
  width: "100%",
  alignItems: "center",
  paddingInline: layouts.full,
});

export const buttonGroup = style({
  display: "flex",
  flexDirection: "row-reverse",
  gap: dp(2),
});

export const categoryBtn = style({
  margin: 0,
  display: "inline-flex",
  paddingInline: dp(0),
  paddingBlock: dp(0),
  justifyContent: "flex-start",
  alignItems: "center",
  border: "none",
  fontSize: dp(4.5),
  backgroundColor: "transparent",
  color: color.text,
  fontWeight: 800,
  fontFamily: '"Google Sans Code", monospace',
  cursor: "pointer",
});
