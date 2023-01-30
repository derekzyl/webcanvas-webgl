import { fillRect } from "./shapes";
import "./style.css";

function draw() {
  const canvas = document.querySelector<HTMLCanvasElement>("#app");

  if (canvas?.getContext) {
    const context = canvas?.getContext("2d")!;

    context.globalAlpha = 0.5;

    const cursor = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    };

    let particlesArray: any = [];
    addEventListener("mouseover", (e) => {
      generateParticles(100);

      anim();
    });
    addEventListener("mouseout", (e) => {
      context.clearRect(0, 0, innerWidth, innerHeight);
    });
    addEventListener("mousemove", (e) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    });

    addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
        cursor.x = e.touches[0].clientX;
        cursor.y = e.touches[0].clientY;
      },
      { passive: false }
    );

    addEventListener("resize", () => setSize());

    function generateColor() {
      let hexSet = "0123456789ABCDEF";
      let finalHexString = "#";
      for (let i = 0; i < 6; i++) {
        finalHexString += hexSet[Math.ceil(Math.random() * 15)];
      }
      return finalHexString;
    }

    function setSize() {
      canvas!.height = innerHeight;
      canvas!.width = innerWidth;
    }

    class Particle {
      x: any;
      y: any;
      particleTrailWidth: any;
      strokeColor: any;
      theta: any;
      rotateSpeed: any;
      t: number;
      constructor(
        x: any,
        y: any,
        particleTrailWidth: any,
        strokeColor: any,
        rotateSpeed: any
      ) {
        this.x = x;
        this.y = y;
        this.particleTrailWidth = particleTrailWidth;
        this.strokeColor = strokeColor;
        this.theta = Math.random() * Math.PI * 2;
        this.rotateSpeed = rotateSpeed;
        this.t = Math.random() * 150;
      }

      rotate = () => {
        const ls = {
          x: this.x,
          y: this.y,
        };
        this.theta += this.rotateSpeed;
        this.x = cursor.x + Math.cos(this.theta) * this.t;
        this.y = cursor.y + Math.sin(this.theta) * this.t;
        context.beginPath();
        context.lineWidth = this.particleTrailWidth;
        context.strokeStyle = this.strokeColor;
        context.moveTo(ls.x, ls.y);
        context.lineTo(this.x, this.y);
        context.stroke();
      };
    }

    function generateParticles(amount: any) {
      for (let i = 0; i < amount; i++) {
        particlesArray[i] = new Particle(
          innerWidth / 2,
          innerHeight / 2,
          4,
          generateColor(),
          0.02
        );
      }
    }

    function anim() {
      requestAnimationFrame(anim);

      context.fillStyle = "rgba(0,0,0,0.05)";
      context.fillRect(0, 0, canvas!.width, canvas!.height);

      particlesArray.forEach((particle: any) => particle.rotate());
    }
    setSize();
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
