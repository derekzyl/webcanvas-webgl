import "./style.css";

const he = document.querySelector<HTMLDivElement>(".tester");

he!.style.position = "absolute";
he!.style.justifyContent = "center";
he!.style.alignItems = "center";
he!.style.color = "blue";
he!.style.zIndex = "500";
he!.style.fontSize = "50px";
he!.style.display = "flex";
he!.style.alignContent = "center";
he!.style.left = "50%";
he!.style.top = "50%";

he!.addEventListener("mouseover", () => console.log("inside the div"));
function initOscillator(remove: boolean) {
  if (!remove) {
    var ctx: any,
      hue,
      logo,
      form,
      buffer: any,
      target: any = {},
      tendrils: any = [],
      settings: any = {};

    settings.debug = false;
    settings.friction = 0.5;
    settings.trails = 30;
    settings.size = 50;
    settings.dampening = 0.25;
    settings.tension = 0.98;

    // ========================================================================================
    // Oscillator
    // ----------------------------------------------------------------------------------------

    class Oscillator {
      phase: number;
      offset: number;
      frequency: number;
      amplitude: number;
      value: number;
      constructor(options: any) {
        this.phase = 0;
        this.offset = 0;
        this.frequency = 0.001;
        this.amplitude = 1;
        this.init(options);
        this.value = 0;
      }
      init(options: any) {
        this.phase = options.phase || 0;
        this.offset = options.offset || 0;
        this.frequency = options.frequency || 0.001;
        this.amplitude = options.amplitude || 1;
      }
      update() {
        this.phase += this.frequency;
        this.value = this.offset + Math.sin(this.phase) * this.amplitude;
        return this.value;
      }
      valuer() {
        return this.value;
      }
    }

    // ========================================================================================
    // Tendril
    // ----------------------------------------------------------------------------------------
    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      constructor() {
        this.x = 0;
        this.y = 0;
        this.vy = 0;
        this.vx = 0;
      }
    }
    class Tendril {
      spring: number;
      friction: number;
      nodes: any[];
      constructor(options: any) {
        this.spring = Math.random() * 0.1 - 0.05;
        this.friction = Math.random() * 0.01 - 0.005;
        this.nodes = [];
        this.init(options);
      }
      init(options: any) {
        this.spring = options.spring + Math.random() * 0.1 - 0.05;
        this.friction = settings.friction + Math.random() * 0.01 - 0.005;
        this.nodes = [];

        for (var i = 0, node; i < settings.size; i++) {
          node = new Node();
          node.x = target.x;
          node.y = target.y;

          this.nodes.push(node);
        }
      }
      update() {
        var spring = this.spring,
          node = this.nodes[0];

        node.vx += (target.x - node.x) * spring;
        node.vy += (target.y - node.y) * spring;

        for (var prev, i = 0, n = this.nodes.length; i < n; i++) {
          node = this.nodes[i];

          if (i > 0) {
            prev = this.nodes[i - 1];

            node.vx += (prev.x - node.x) * spring;
            node.vy += (prev.y - node.y) * spring;
            node.vx += prev.vx * settings.dampening;
            node.vy += prev.vy * settings.dampening;
          }

          node.vx *= this.friction;
          node.vy *= this.friction;
          node.x += node.vx;
          node.y += node.vy;

          spring *= settings.tension;
        }
      }
      draw() {
        var x = this.nodes[0].x,
          y = this.nodes[0].y,
          a,
          b;

        ctx.beginPath();
        ctx.moveTo(x, y);

        for (var i = 1, n = this.nodes.length - 2; i < n; i++) {
          a = this.nodes[i];
          b = this.nodes[i + 1];
          x = (a.x + b.x) * 0.5;
          y = (a.y + b.y) * 0.5;

          ctx.quadraticCurveTo(a.x, a.y, x, y);
        }

        a = this.nodes[i];
        b = this.nodes[i + 1];

        ctx.quadraticCurveTo(a.x, a.y, b.x, b.y);
        ctx.stroke();
        ctx.closePath();
      }
    }

    // ----------------------------------------------------------------------------------------

    function init(event: any) {
      document.removeEventListener("mousemove", init);
      document.removeEventListener("touchstart", init);

      document.addEventListener("mousemove", mousemove);
      document.addEventListener("touchmove", mousemove);
      document.addEventListener("touchstart", touchstart);

      mousemove(event);
      reset();
      loop();
    }

    function reset() {
      tendrils = [];

      for (var i = 0; i < settings.trails; i++) {
        tendrils.push(
          new Tendril({
            spring: 0.45 + 0.025 * (i / settings.trails),
          })
        );
      }
    }

    function randomIntFromInterval(min: number, max: number) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var color = randomIntFromInterval(1, 2);

    function loop() {
      if (!ctx.running) return;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#1D1D1D";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = "hsla(346,98%,56%,0.25)";
      ctx.lineWidth = 1;

      if (color == 1) {
        ctx.strokeStyle = "hsla(346,98%,56%,0.25)";
      } else {
        ctx.strokeStyle = "hsla(171,98%,56%,0.25)";
      }

      for (var i = 0, tendril; i < settings.trails; i++) {
        tendril = tendrils[i];
        tendril.update();
        tendril.draw();
      }

      ctx.frame++;
      requestAnimationFrame(loop);
    }

    function resize() {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }

    function start() {
      if (!ctx.running) {
        ctx.running = true;
        loop();
      }
    }

    function stop() {
      ctx.running = false;
    }

    function mousemove(event: any) {
      if (event.touches) {
        target.x = event.touches[0].pageX;
        target.y = event.touches[0].pageY;
      } else {
        target.x = event.clientX;
        target.y = event.clientY;
      }
      event.preventDefault();
    }

    function touchstart(event: any) {
      if (event.touches.length == 1) {
        target.x = event.touches[0].pageX;
        target.y = event.touches[0].pageY;
      }
    }

    function keyup(event: any) {
      switch (event.keyCode) {
        case 32:
          save();
          break;
        default:
        // console.log(event.keyCode);
      }
    }

    function letters(id: any) {
      var el = document.getElementById(id)!,
        letters = el.innerHTML.replace("&amp;", "&").split(""),
        heading = "";

      for (var i = 0, n = letters.length, letter; i < n; i++) {
        letter = letters[i].replace("&", "&amp");
        heading += letter.trim()
          ? '<span class="letter-' + i + '">' + letter + "</span>"
          : "&nbsp;";
      }

      el.innerHTML = heading;
      setTimeout(function () {
        el.className = "transition-in";
      }, Math.random() * 500 + 500);
    }

    function save() {
      if (!buffer) {
        buffer = document.createElement("canvas");
        buffer.width = screen.availWidth;
        buffer.height = screen.availHeight;
        buffer.ctx = buffer.getContext("2d");

        form = document.createElement("form");
        form.method = "post";
        form.input = document.createElement("input");
        form.input.type = "hidden";
        form.input.name = "data";
        form.appendChild(form.input);

        document.body.appendChild(form);
      }

      buffer.ctx.fillStyle = "rgba(8,5,16)";
      buffer.ctx.fillRect(0, 0, buffer.width, buffer.height);

      // buffer.ctx.drawImage(
      //   canvas,
      //   Math.round(buffer.width / 2 - canvas.width / 2),
      //   Math.round(buffer.height / 2 - canvas.height / 2)
      // );

      window.open(
        buffer.toDataURL(),
        "wallpaper",
        "top=0,left=0,width=" + buffer.width + ",height=" + buffer.height
      );

      // form.input.value = buffer.toDataURL().substr(22);
      // form.submit();
    }

    ctx = document
      .querySelector<HTMLCanvasElement>("#canvas")!
      .getContext("2d");

    ctx.running = true;
    ctx.frame = 1;

    hue = new Oscillator({
      phase: Math.random() * Math.PI * 2,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });

    document.addEventListener("mousemove", init);
    document.addEventListener("touchstart", init);
    document.body.addEventListener("orientationchange", resize);
    window.addEventListener("resize", resize);
    window.addEventListener("focus", start);
    window.addEventListener("blur", stop);

    resize();
  } else {
    // document.body.removeEventListener("orientationchange", resize);
    // window.removeEventListener("resize", resize);
    // window.removeEventListener("focus", start);
    // window.removeEventListener("blur", stop);
    // document.removeEventListener("mousemove", mousemove);
    // document.removeEventListener("touchmove", mousemove);
    // document.removeEventListener("touchstart", touchstart);
  }
}

// const context = canvas?.getContext("2d")!;
// function draw() {
//   if (canvas?.getContext) {
//     context.globalAlpha = 0.5;

//     const cursor = {
//       x: innerWidth / 2,
//       y: innerHeight / 2,
//     };

//     let particlesArray: any = [];

//     const v = addEventListener("mousemove", (e) => {
//       e.preventDefault();
//       cursor.x = e.clientX;
//       cursor.y = e.clientY;
//       generateParticles(100);

//       // cancelAnimationFrame(animes);
//       anim();
//       // cancelAnimationFrame(animes);
//     });

//     addEventListener("mousemove", (e) => {
//       e.preventDefault();
//       cursor.x = e.clientX;
//       cursor.y = e.clientY;
//     });
//     removeEventListener("mousemove", () => console.log("removed"));

//     addEventListener(
//       "touchmove",
//       (e) => {
//         e.preventDefault();
//         cursor.x = e.touches[0].clientX;
//         cursor.y = e.touches[0].clientY;
//       },
//       { passive: false }
//     );

//     addEventListener("resize", () => setSize());

//     function generateColor() {
//       let hexSet = "0123456789ABCDEF";
//       let finalHexString = "#";
//       for (let i = 0; i < 6; i++) {
//         finalHexString += hexSet[Math.ceil(Math.random() * 15)];
//       }
//       return finalHexString;
//     }

//     function setSize() {
//       canvas!.height = innerHeight;
//       canvas!.width = innerWidth;
//     }

//     class Particle {
//       x: any;
//       y: any;
//       particleTrailWidth: any;
//       strokeColor: any;
//       theta: any;
//       rotateSpeed: any;
//       t: number;
//       constructor(
//         x: any,
//         y: any,
//         particleTrailWidth: any,
//         strokeColor: any,
//         rotateSpeed: any
//       ) {
//         this.x = x;
//         this.y = y;
//         this.particleTrailWidth = particleTrailWidth;
//         this.strokeColor = strokeColor;
//         this.theta = Math.random() * Math.PI * 2;
//         this.rotateSpeed = rotateSpeed;
//         this.t = Math.random() * 150;
//       }

//       rotate = () => {
//         const ls = {
//           x: this.x,
//           y: this.y,
//         };
//         this.theta += this.rotateSpeed;
//         this.x = cursor.x + Math.cos(this.theta) * this.t;
//         this.y = cursor.y + Math.sin(this.theta) * this.t;
//         context.beginPath();
//         context.lineWidth = this.particleTrailWidth;
//         context.strokeStyle = this.strokeColor;
//         context.moveTo(ls.x, ls.y);
//         context.lineTo(this.x, this.y);
//         context.stroke();
//       };
//     }

//     function generateParticles(amount: any) {
//       for (let i = 0; i < amount; i++) {
//         particlesArray[i] = new Particle(
//           innerWidth / 2,
//           innerHeight / 2,
//           4,
//           generateColor(),
//           0.01
//         );
//       }
//     }

//     function anim() {
//        requestAnimationFrame(anim);

//       context.fillStyle = "rgba(0,0,0,0.05)";
//       context.fillRect(0, 0, canvas!.width, canvas!.height);

//       particlesArray.forEach((particle: any) => particle.rotate());
//     }
//     setSize();
//   } else {
//     canvas!.innerHTML! = /*html*/ `
//   <div>oops unsupported</div>
//   `;
//   }
// }

window.addEventListener("load", (event: any) => {
  console.log("page is fully loaded");
  initOscillator(false);
});
//! non-zero and even-odd for fill rule
//! rotate radians = (Math.PI/180)*degrees. context.rotate(Math.PI/180 *23)
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
