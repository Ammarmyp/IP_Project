document.addEventListener("DOMContentLoaded", function (){
    const wheel = document.getElementById("wheel");
    const spinButton = document.getElementById("spinButton");
   
    spinButton.addEventListener("click", spinWheel);

    function spinWheel (){
        wheel.transform = "rotate(0deg)";
        wheel.offsetWidth;


        const randomDegree = 360 * 6 + + 720 + Math.floor(Math.random() *  360); //for multiple spins
        wheel.style.transition = "transform 4s ease-out";
        wheel.style.transform = `rotate(${+randomDegree}deg )`;
        console.log("rotating function")
        console.log(randomDegree)


        wheel.addEventListener("transitionend", () => {
            //add logic to handle the result when the wheel stops spinning
            //you can use the current rotation anlge to determine angle to determine the selected section
    
            // wheel.style.transition = "none"; //remove transition for instant rotation
            // const rotation = wheel.style.transform.match(/(\d+)/)[0] || 0;
            console.log("Wheel stopped spinning!");
    
        })
    }
    
    
} )

// *{
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
// }

// body{
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     height: 100vh;
//     background: #072d46;
// }

// .wheel{
//     margin: 2rem;
//     position: relative;
//     width: 200px;
//     height: 200px;
//     background-color: #f1f1f1;
//     /* makes the cirle shape in the div */
//     border-radius: 50%;  
//     overflow: hidden;
//     transform: 3s ease-out;
// }




// .wheel-section{
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     clip-path: polygon(50% 50%, 100% 0, 100% 100%);
//     background-color: #3498db;
//     color: #fff;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 14px;
//     font-weight: bold;
//     text-align: center;
//     /* transform-origin: 100% 50%; */
//     transition: transform 3s ease-out;
// }

// button{
//     margin-top: 20px;
//     padding: 10px 20px;
//     font-size: 16px;
//     cursor: pointer;
// }

const spin = document.querySelector("#spin");
const ctx = document.querySelector("#wheel").getContext`2d`;

const sectors = [
  {color:"#a7a7a7", label:"0"},
  {color:"#0bf", label:"iPhone 15"},
  {color:"#a7a7a7", label:"0"},
  {color:"#fb0", label:"PlayStation"},
  {color:"#a7a7a7", label:"0"},
  {color:"#b0f", label:"MacBook"},
  {color:"#a7a7a7", label:"0"},
  {color:"#bf0", label:"AirPods"},
];

const iphone = new Image();
iphone.src = 'https://stylus.ua/thumbs/138x138/03/56/3057100.jpeg';

const playstation = new Image();
playstation.src = 'https://stylus.ua/thumbs/138x138/13/4b/1742615.jpeg';

const macbook = new Image();
macbook.src = 'https://stylus.ua/thumbs/138x138/42/fc/2905272.jpeg';

const airpods = new Image();
airpods.src = 'https://stylus.ua/thumbs/138x138/79/1c/2499017.jpeg';


// Generate random float in range min-max:
const rand = (m, M) => Math.random() * (M - m) + m;

const tot = sectors.length;
const dia = ctx.canvas.width;
const rad = dia / 2;
const PI = Math.PI;
const TAU = 2 * PI;
const arc = TAU / tot;
const friction = 0.991;  // 0.995=soft, 0.99=mid, 0.98=hard
const angVelMin = 0.002; // Below that number will be treated as a stop

let angVelMax = 0; // Random ang.vel. to accelerate to 
let angVel = 0;    // Current angular velocity
let ang = 0;       // Angle rotation in radians
let isSpinning = false;
let isAccelerating = false;
let animFrame = null; // Engine's requestAnimationFrame

//* Get index of current sector */
const getIndex = () => Math.floor(tot - ang / TAU * tot) % tot;

//* Draw sectors and prizes texts to canvas */
function drawAll(sector, i) {
    const ang = arc * i;
    ctx.save();
    // COLOR
    ctx.beginPath();
    ctx.fillStyle = sector.color;
    ctx.moveTo(rad, rad);
    ctx.arc(rad, rad, rad, ang, ang + arc);
    ctx.lineTo(rad, rad);
    ctx.fill();
    // TEXT
    ctx.translate(rad, rad);
    ctx.rotate(ang + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 30px sans-serif";

    drawWin(sector, i);
    
    ctx.restore();
};

function drawWin(sector, i) {
  if(sector.label === "iPhone 15") {
    ctx.drawImage(iphone, rad -110, -50, 100, 100);
  } else if(sector.label === "PlayStation") {
    ctx.drawImage(playstation, rad -110, -50, 100, 100);
  } else if(sector.label === "MacBook") {
      ctx.drawImage(macbook, rad -110, -50, 100, 100);
  } else if(sector.label === "AirPods") {
      ctx.drawImage(airpods, rad -110, -50, 100, 100);
  } else {
      ctx.fillText(sector.label, rad - 10, 10);
  }
}

//* CSS rotate CANVAS Element */
function rotate() {
    const sector = sectors[getIndex()];
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
    spin.textContent = !angVel ? "SPIN" : sector.label;
    spin.style.background = sector.color;
};

function frame() {
    if (!isSpinning) return;
    if (angVel >= angVelMax) isAccelerating = false;
    // Accelerate
    if (isAccelerating) {
        angVel ||= angVelMin; // Initial velocity kick
        angVel *= 2; // Accelerate
    } else {
        isAccelerating = false;
        angVel *= friction; // Decelerate by friction  

        // SPIN END:
        if (angVel < angVelMin) {
          isSpinning = false;
          angVel = 0;
          cancelAnimationFrame(animFrame);
        }
    }

    ang += angVel; // Update angle
    ang %= TAU;    // Normalize angle
    rotate();      // CSS rotate!
};

function engine() {
    frame();
    animFrame = requestAnimationFrame(engine)
};

spin.addEventListener("click", () => {
    if (isSpinning) return;
    isSpinning = true;
    isAccelerating = true;
    angVelMax = rand(0.25, 0.40);
    engine(); // Start engine!
});

// INIT!
sectors.forEach(drawAll);
rotate(); // Initial rotation