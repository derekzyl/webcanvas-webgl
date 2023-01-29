function gradientLinearColor(lc: linearColorI) {
  const linear = lc.context!.createLinearGradient(
    lc.x_begin ?? 0,
    lc.y_begin ?? 0,
    lc.x_end ?? 0,
    lc.y_end ?? 0
  );

  for (let [key, values] of Object.entries(lc.gradient_fill)) {
    linear.addColorStop(Number(key), values);
  }
  return linear;
}
function gradientRadialColor(rc: radialColorI) {
  const radial = rc.context!.createRadialGradient(
    rc.x_begin ?? 0,
    rc.y_begin ?? 0,
    rc.r_begin ?? 0,
    rc.x_end ?? 0,
    rc.y_end ?? 0,
    rc.r_end ?? 0
  );

  for (let [key, values] of Object.entries(rc.gradient_fill)) {
    radial.addColorStop(Number(key), values);
  }
  return radial;
}
function gradientConeColor(cc: coneColorI) {
  const conic = cc.context!.createConicGradient(
    cc.start_angle ?? 0,
    cc.x_begin ?? 0,
    cc.y_begin ?? 0
  );

  for (let [key, values] of Object.entries(cc.gradient_fill)) {
    conic.addColorStop(Number(key), values);
  }
  return conic;
}
