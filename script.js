function previewWatermark() {
  if (!uploadedImage) return;

  let text = document.getElementById("textInput").value;
  let font = document.getElementById("fontSelect").value;
  let color = document.getElementById("colorPicker").value;
  let opacity = document.getElementById("opacitySlider").value;
  let position = document.getElementById("position").value;

  ctx.drawImage(uploadedImage, 0, 0);
  ctx.font = `40px ${font}`;
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity;
  ctx.textAlign = "center";

  let x = canvas.width / 2;
  let y = canvas.height / 2;

  switch (position) {
    case "top-left":
      x = 100;
      y = 60;
      break;
    case "top-right":
      x = canvas.width - 100;
      y = 60;
      break;
    case "center":
      x = canvas.width / 2;
      y = canvas.height / 2;
      break;
    case "bottom-left":
      x = 100;
      y = canvas.height - 60;
      break;
    case "bottom-right":
      x = canvas.width - 100;
      y = canvas.height - 60;
      break;
  }

  ctx.fillText(text, x, y);
  ctx.globalAlpha = 1; // Reset alpha
}