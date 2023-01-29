import { fillRect } from "./shapes";
import "./style.css";

function draw() {
  const results = [
    { name: "Satisfied", count: 1043, color: "lightblue" },
    { name: "Neutral", count: 563, color: "lightgreen" },
    { name: "Unsatisfied", count: 510, color: "pink" },
    { name: "No comment", count: 175, color: "silver" },
  ];
  const canvas = document.querySelector<HTMLCanvasElement>("#app");

  if (canvas?.getContext) {
    const cx = canvas?.getContext("2d")!;
    function eventa() {
      let x: number;
      let y: number;
      let w: number;
      let h: number;
      canvas?.addEventListener("click", (event: any) => {
        console.log(event.clientX, "click");
        x = event.clientX;
        y = event.clientY;
        canvas?.addEventListener("mousedown", (event: any) => {
          canvas?.addEventListener("mousemove", (event: any) => {
            console.log(event.clientX, "mousedown");

            w = event.clientX;
            h = event.clientY;

            fillRect(
              { blue: 255, red: 0, green: 0 },
              { context: cx, x, y, height: h, width: w }
            );
            cx.closePath();
            window.requestAnimationFrame(draw);
          });
        });
      });
    }
    eventa();
  } else {
    canvas!.innerHTML! = /*html*/ `
  <div>oops unsupported</div>  
  `;
  }
}
draw();

//! non-zero and even-odd for fill rule
//! rotate radians = (Math.PI/180)*degrees. ctx.rotate(Math.PI/180 *23)
//!transform(a, b, c, d, e, f)a (m11)
//a (m11)
// Horizontal scaling.

// b (m12)
// Horizontal skewing.

// c (m21)
// Vertical skewing.

// d (m22)
// Vertical scaling.

// e (dx)
// Horizontal moving.

// f (dy)
// Vertical moving.

//! pie chart

// let total = results.reduce((sum, { count }) => sum + count, 0);
// // Start at the top
// let currentAngle = -0.5 * Math.PI;
// for (let result of results) {
//   let sliceAngle = (result.count / total) * 2 * Math.PI;
//   cx.beginPath();
//   // center=100,100, radius=100
//   // from current angle, clockwise by slice's angle
//   cx.arc(100, 100, 100, currentAngle, currentAngle + sliceAngle);
//   currentAngle += sliceAngle;
//   cx.lineTo(100, 100);
//   cx.fillStyle = result.color;

//   cx.fill();
// }
