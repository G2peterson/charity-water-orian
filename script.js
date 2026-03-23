const img = document.getElementById("sceneImage");
const title = document.getElementById("title");
const message = document.getElementById("message");

const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const sliderArea = document.getElementById("sliderArea");
const checkBtn = document.getElementById("checkBtn");
const marker = document.getElementById("marker");

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let scene = 0;
let step = 0;
let success = false;

/* SCENES */
const scenes = [
  {
    img: "scene1.png",
    title: "Orion Contact",
    message: "Your dexterity determines who can help deliver water.",
    steps: 1
  },
  {
    img: "scene2.png",
    title: "Arctic Test",
    message: "Consistency saves lives. Prove it again.",
    steps: 1
  },
  {
    img: "scene3.png",
    title: "Mission Execution",
    message: "Landing, loading, and launch must all succeed.",
    steps: 3
  },
  {
    img: "scene4.png",
    title: "Mission Complete",
    message: "Because of you, clean water reaches those who need it most. Prepare for Water Mission 2.",
    steps: 0
  }
];

/* SLIDER */
let pos = 0;
let dir = 1;

setInterval(() => {
  pos += dir;

  if (pos >= 100) dir = -1;
  if (pos <= 0) dir = 1;

  marker.style.left = pos + "%";
}, 10);

/* LOAD SCENE */
function loadScene() {
  const s = scenes[scene];

  img.src = s.img;
  title.textContent = s.title;
  message.textContent = s.message;

  nextBtn.disabled = true;
  success = false;
  step = 0;

  if (s.steps === 0) {
    sliderArea.style.display = "none";
    nextBtn.style.display = "none";
    restartBtn.classList.remove("hidden");
    startFireworks();
  } else {
    sliderArea.style.display = "block";
    nextBtn.style.display = "inline-block";
    restartBtn.classList.add("hidden");
    stopFireworks();
  }
}

/* CHECK SKILL */
checkBtn.onclick = () => {
  if (pos >= 40 && pos <= 60) {
    step++;

    if (scene === 2) {
      if (step === 1) message.textContent = "Landing confirmed.";
      if (step === 2) message.textContent = "Water loaded.";
      if (step === 3) {
        message.textContent = "Launch ready.";
        success = true;
        nextBtn.disabled = false;
      }
    } else {
      success = true;
      nextBtn.disabled = false;
    }

  } else {
    alert("Missed, try again");
  }
};

/* NEXT */
nextBtn.onclick = () => {
  if (!success) return;

  scene++;
  loadScene();
};

/* RESTART */
restartBtn.onclick = () => {
  scene = 0;
  loadScene();
};

/* FIREWORKS */
function startFireworks() {
  canvas.classList.remove("hidden");
  canvas.width = window.innerWidth;
  canvas.height = 200;

  let particles = [];

  function explode() {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;

    for (let i = 0; i < 20; i++) {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 50
      });
    }
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.1) explode();

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;

      ctx.fillStyle = "yellow";
      ctx.fillRect(p.x, p.y, 3, 3);
    });

    particles = particles.filter(p => p.life > 0);

    requestAnimationFrame(loop);
  }

  loop();
}

function stopFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.classList.add("hidden");
}

/* INIT */
loadScene();
