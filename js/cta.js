function showCTA(ctx) {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fff";
  ctx.font = "25px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Download the Game?", canvas.width / 2, canvas.height / 2 - 50);

  const btnX = canvas.width / 2 - 70;
  const btnY = canvas.height / 2;
  const btnWidth = 140;
  const btnHeight = 50;

  const gradient = ctx.createLinearGradient(btnX, btnY, btnX, btnY + btnHeight);
  gradient.addColorStop(0, "#288683");
  ctx.fillStyle = gradient;
  ctx.fillRect(btnX, btnY, btnWidth, btnHeight);

  ctx.strokeStyle = "#ffebd0";
  ctx.lineWidth = 3;
  ctx.strokeRect(btnX, btnY, btnWidth, btnHeight);
  //   ctx.shadowColor = "rgba(214, 208, 170, 0.7)";
  ctx.shadowBlur = 10;
  ctx.fillStyle = "#fff";
  ctx.font = "bold 16px Arial";
  ctx.fillText("Download Now", canvas.width / 2, btnY + 35);
  ctx.shadowBlur = 0;

  canvas.removeEventListener("click", handleCTAClick);
  canvas.addEventListener("click", handleCTAClick);
}

function handleCTAClick(e) {
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;
  const btnX = canvas.width / 2 - 70;
  const btnY = canvas.height / 2;
  if (
    clickX >= btnX &&
    clickX <= btnX + 140 &&
    clickY >= btnY &&
    clickY <= btnY + 50
  ) {
    window.location.href =
      "https://play.google.com/store/apps/details?id=games.burny.color.sort.woody.puzzle&hl=en-US";
  }
}
