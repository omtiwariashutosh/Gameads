function playIntro() {
  video.style.display = "block";
  canvas.style.display = "none";
  if (video.paused) {
    video.currentTime = 0;
    video.play().catch((error) => {
      console.error("Video playback failed:", error);
    });
  }
}
