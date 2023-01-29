interface linearColorI {
  context: CanvasRenderingContext2D;
  x_begin?: number;
  y_begin?: number;
  x_end?: number;
  y_end?: number;
  gradient_fill: Record<string, string>;
}
interface coneColorI {
  context: CanvasRenderingContext2D;
  x_begin?: number;
  y_begin?: number;
  start_angle?: number;
  gradient_fill: Record<string, string>;
}
interface radialColorI {
  context: CanvasRenderingContext2D;
  x_begin?: number;
  y_begin?: number;
  r_begin?: number;
  x_end?: number;
  y_end?: number;
  r_end?: number;
  gradient_fill: Record<string, string>;
}
interface color {
  red: number;
  green: number;
  blue: number;
  opacity?: number;
}
