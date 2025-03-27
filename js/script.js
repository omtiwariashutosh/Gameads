const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const video = document.getElementById("introVideo");
let time = 0;
let gameInitialized = false;

function updateAd() {
  time += 1 / 60; // Assuming 60 FPS

  if (time <= 10) {
    playIntro(); // 1-10s: Video intro
  } else if (time <= 25) {
    video.style.display = "none";
    canvas.style.display = "block";
    if (!gameInitialized) {
      initGame(); // Initialize game once
      gameInitialized = true;
    }
    updateGame(ctx); // 11-25s: Snake game
  } else if (time <= 30) {
    showCTA(ctx); // 26-30s: CTA button
  }

  requestAnimationFrame(updateAd);
}

updateAd();
