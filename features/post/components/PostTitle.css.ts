import { style } from "@vanilla-extract/css";
import { dp } from "styles/dp";
import { color } from "styles/vars/color.css";

export const title = style({
  fontSize: dp(18),
  marginTop: dp(10),
  marginBottom: dp(4),
  color: color.text,
  textAlign: "left",
  verticalAlign: "middle",
  fontWeight: 700,
  fontFamily: '"Mona Sans", "Pretendard", monospace',
  lineHeight: 1.15,
});
