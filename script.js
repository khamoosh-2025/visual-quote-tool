let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let uploadedImage = null;
let textX = 100, textY = 100;
let isDragging = false;

document.getElementById("imageInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      uploadedImage = img;
      drawText();
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

canvas.addEventListener("mousedown", function (e) {
  isDragging = true;
});
canvas.addEventListener("mouseup", function (e) {
  isDragging = false;
});
canvas.addEventListener("mousemove", function (e) {
  if (isDragging && uploadedImage) {
    textX = e.offsetX;
    textY = e.offsetY;
    drawText();
  }
});

function drawText() {
  if (!uploadedImage) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(uploadedImage, 0, 0);
  const text = document.getElementById("textInput").value;
  const font = document.getElementById("fontSelect").value;
  const size = document.getElementById("fontSize").value;
  const color = document.getElementById("colorPicker").value;
  const opacity = document.getElementById("opacitySlider").value;

  ctx.font = size + "px " + font;
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity;
  ctx.fillText(text, textX, textY);
  ctx.globalAlpha = 1;
}

["textInput", "fontSelect", "fontSize", "colorPicker", "opacitySlider"].forEach(id => {
  document.getElementById(id).addEventListener("input", drawText);
});

function downloadImage() {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = canvas.toDataURL();
  link.click();
}
