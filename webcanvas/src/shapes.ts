function drawTriangleFill(t: triangleI, color: Partial<color>) {
  const cool_color = `rgb(${color.red ?? 0},${color.green ?? 0},${
    color.blue ?? 0
  })`;

  t.context!.fillStyle = cool_color;
  t.context?.beginPath();
  t.context?.moveTo(t.xy, t.yz);
  t.context?.lineTo(t.yz, t.zx);
  t.context?.lineTo(t.xy, t.zx);
  t.context?.lineTo(t.xy, t.yz);
  t.context?.fill();
}
function drawTriangleStroke(t: triangleI, color: Partial<color>) {
  const cool_color = `rgb(${color.red ?? 0},${color.green ?? 0},${
    color.blue ?? 0
  })`;

  t.context!.fillStyle = cool_color;
  t.context?.beginPath();
  t.context?.moveTo(t.xy, t.yz);
  t.context?.lineTo(t.yz, t.zx);
  t.context?.lineTo(t.xy, t.zx);
  t.context?.lineTo(t.xy, t.yz);
  t.context?.stroke();
}

function roundedRectStroke({
  context,
  x,
  y,
  width,
  height,
  radius,
}: roundedRectI) {
  context?.beginPath();
  context?.moveTo(x, y + radius);
  context?.arcTo(x, y + height, x + radius, y + height, radius);
  context?.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  context?.arcTo(x + width, y, x + width - radius, y, radius);
  context?.arcTo(x, y, x, y + radius, radius);
  context?.stroke();
}
function roundedRectFill(
  { context, x, y, width, height, radius }: roundedRectI,
  color: color
) {
  const cool_color = `rgb(${color.red ?? 0},${color.green ?? 0},${
    color.blue ?? 0
  })`;
  context!.fillStyle = cool_color;
  context?.beginPath();
  context?.moveTo(x, y + radius);
  context?.arcTo(x, y + height, x + radius, y + height, radius);
  context?.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  context?.arcTo(x + width, y, x + width - radius, y, radius);
  context?.arcTo(x, y, x, y + radius, radius);
  context?.fill();
}
function fill_rect(color: color, shape: rectShape) {
  const cool_color = `rgb(${color.red},${color.green},${color.blue})`;
  shape.context!.fillStyle = cool_color;
  shape.context!.fillRect(shape.x, shape.y, shape.width, shape.height);
}
function clear_rect(shape: rectShape) {
  shape.context!.clearRect(shape.x, shape.y, shape.width, shape.height);
}
function stroke_rect(color: color, shape: rectShape) {
  const cool_color = `rgb(${color.red},${color.green},${color.blue})`;
  shape.context!.strokeStyle = cool_color;
  shape.context!.strokeRect(shape.x, shape.y, shape.width, shape.height);
}
function circleStroke({
  context,
  x,
  y,
  radius,
  start_angle,
  end_angle,
  clockwise,
}: circleShape) {
  context?.beginPath();
  context?.arc(
    x,
    y,
    radius,
    start_angle,
    end_angle ?? Math.PI * 2,
    clockwise ?? true
  );
  context?.stroke();
}
function circleFill(
  { context, x, y, radius, start_angle, end_angle, clockwise }: circleShape,
  color: color
) {
  const cool_color = `rgb(${color.red ?? 0},${color.green ?? 0},${
    color.blue ?? 0
  })`;
  context!.fillStyle = cool_color;
  context?.beginPath();
  context?.arc(
    x,
    y,
    radius,
    start_angle,
    end_angle ?? Math.PI * 2,
    clockwise ?? true
  );
  context?.fill();
}
