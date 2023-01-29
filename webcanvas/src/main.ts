import "./style.css";
// function rect(canvas: CanvasRect) {

//   canvas.fillRect()

// }

function draw() {
  const canvas = document.querySelector<HTMLCanvasElement>("#app");

  if (canvas?.getContext) {
    const context = canvas?.getContext("2d");

    // drawTriangle(
    //   { context, xy: 200, yz: 300, zx: 200 },
    //   { blue: 255, green: 0, red: 0, opacity: 1 }
    // );

    // circleFill(
    //   {
    //     context,
    //     x: 100,
    //     y: 200,
    //     radius: 100,
    //     start_angle: 0,
    //     end_angle: Math.PI * 2,
    //     clockwise: true,
    //   },
    //   { blue: 255, green: 0, red: 0, opacity: 1 }
    // );

    // roundedRectFill(
    //   { context, x: 100, y: 100, width: 50, height: 100, radius: 20 },
    //   { blue: 255, green: 0, red: 0, opacity: 1 }
    // );

    for (let i = 0; i < 10; i++) {
      context!.lineWidth = 1 + i;
      context!.beginPath();
      context!.moveTo(5 + i * 14, 5);
      context!.lineTo(5 + i * 14, 140);
      context!.stroke();
    }
  } else {
    canvas!.innerHTML! = /*html*/ `
  <div>oops unsupported</div>  
  `;
  }
}
draw();
