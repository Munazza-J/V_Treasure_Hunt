const ANSWERS = {
  l1: "CLOUD",
  door: "blue",
  l2: "4",
  l3: "8",
  seq: ["C","L","O","U","D"],
  portal: "blue"
};

// Typewriter Intro
const introText = "SYSTEM BOOT — unauthorized access detected.\nYou are trapped in the Digital Vault.\nSolve puzzles to escape!";
let pos = 0;
function typeIntro() {
  const el = document.getElementById("intro-text");
  if (pos < introText.length) {
    el.innerHTML += introText[pos] === "\n" ? "<br/>" : introText[pos];
    pos++;
    setTimeout(typeIntro, 30);
  } else {
    setTimeout(() => {
      document.getElementById("intro").classList.add("hidden");
      document.getElementById("terminal").classList.remove("hidden");
      document.getElementById("level1").classList.remove("hidden");
    }, 800);
  }
}
typeIntro();

// Transition Flicker
function fadeTransition(nextFn) {
  const flick = document.getElementById("flicker");
  flick.classList.remove("hidden");
  flick.style.opacity = 1;
  setTimeout(() => flick.style.opacity = 0, 300);
  setTimeout(() => {
    flick.classList.add("hidden");
    nextFn && nextFn();
  }, 500);
}

// Level 1
function check1() {
  const val = document.getElementById("hint1").value.trim().toUpperCase();
  const f = document.getElementById("f1");
  if (val === ANSWERS.l1) {
    f.textContent = "Hint correct! One door glows...";
    document.getElementById(ANSWERS.door + "Door").style.border = "2px solid #00ff99";
  } else f.textContent = "Wrong hint!";
}
function chooseDoor(c) {
  if (c === ANSWERS.door)
    fadeTransition(() => switchLevel(1, 2));
  else document.getElementById("f1").textContent = "Wrong door!";
}

// Level 2
function check2() {
  const v = document.getElementById("a2").value.trim();
  if (v === ANSWERS.l2)
    fadeTransition(() => switchLevel(2, 3));
  else document.getElementById("f2").textContent = "Incorrect!";
}

// Level 3 — Grid
document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", () => {
    cell.classList.toggle("active");
    const activeCount = document.querySelectorAll(".cell.active").length;
    if (activeCount == ANSWERS.l3) {
      document.getElementById("f3").textContent = "Power restored!";
      fadeTransition(() => switchLevel(3, 4));
    }
  });
});

// Level 4 — Drag letters
let dragged;
document.querySelectorAll('.letter').forEach(l => {
  l.addEventListener('dragstart', e => dragged = l);
  l.addEventListener('dragover', e => e.preventDefault());
  l.addEventListener('drop', e => {
    e.preventDefault();
    const parent = e.target.parentNode;
    parent.insertBefore(dragged, e.target);
  });
});
function check4() {
  const letters = [...document.querySelectorAll('#seq .letter')].map(l => l.textContent);
  if (JSON.stringify(letters) === JSON.stringify(ANSWERS.seq))
    fadeTransition(() => switchLevel(4, 5));
  else document.getElementById("f4").textContent = "Wrong order!";
}

// Level 5
function choosePortal(c) {
  if (c === ANSWERS.portal)
    fadeTransition(() => switchLevel(5, "success"));
  else document.getElementById("f5").textContent = "Wrong portal!";
}

// Helper
function switchLevel(curr, next) {
  document.getElementById("level" + curr).classList.add("hidden");
  if (next === "success") document.getElementById("success").classList.remove("hidden");
  else document.getElementById("level" + next).classList.remove("hidden");
}
