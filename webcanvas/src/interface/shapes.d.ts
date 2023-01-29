interface rectShape {
  line_width?: number;
  context: CanvasRenderingContext2D | null;
  x: number;
  y: number;
  width: number;
  height: number;
}
interface triangleI {
  context: CanvasRenderingContext2D | null;
  line_width?: number;

  xy: number;
  yz: number;
  zx: number;
}

interface roundedRectI {
  context: CanvasRenderingContext2D | null;
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
}
interface circleShape {
  line_width?: number;
  context: CanvasRenderingContext2D | null;
  x: number;
  y: number;
  radius: number;
  start_angle: number | 0;
  end_angle: number;

  clockwise: boolean;
}
