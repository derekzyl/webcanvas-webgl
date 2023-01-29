export interface patternI {
  context: CanvasRenderingContext2D;
  imagePath: string;
  pattern: string;
}

export interface textI {
  context: CanvasRenderingContext2D;
  font_size: string;
  font_type: string;
  text: string;
  x: number;
  y: number;
  max_width?: number;
}
