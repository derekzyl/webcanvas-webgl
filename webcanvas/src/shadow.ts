export function createShadow(sd: shadowI) {
  sd.context!.shadowOffsetX = sd.offsetX;
  sd.context!.shadowOffsetY = sd.offsetY;
  sd.context!.shadowBlur = sd.blur ?? 0;
  sd.context!.shadowColor = sd.color ?? "rgb(0,0,0)";

  return sd.context;
}
