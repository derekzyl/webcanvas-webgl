import { textI } from "./interface/others";

export function textPattern(t: textI) {
  t.context!.font = `${t.font_size}, ${t.font_type}`;
  t.context!.fillText(t.text, t.x, t.y, t.max_width ?? undefined);
}
