
const canvas = document.getElementById("imageCanvas");
const ctx = canvas.getContext("2d");

function drawWatermark() {
  const text = document.getElementById("textInput").value;
  const font = document.getElementById("fontSelect").value;
  const color = document.getElementById("colorPicker").value;
  const opacity = parseFloat(document.getElementById("opacitySlider").value);
  const position = document.getElementById("position").value;

  ctx.globalAlpha = 1.0;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.putImageData(imageData, 0, 0);

  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.font = "40px " + font;
  ctx.textAlign = "center";

  let x = canvas.width / 2;
  let y = canvas.height - 60;

  if (position === "top-left") {
    ctx.textAlign = "left";
    x = 20; y = 40;
  } else if (position === "top-right") {
    ctx.textAlign = "right";
    x = canvas.width - 20; y = 40;
  } else if (position === "center") {
    ctx.textAlign = "center";
    x = canvas.width / 2; y = canvas.height / 2;
  } else if (position === "bottom-left") {
    ctx.textAlign = "left";
    x = 20; y = canvas.height - 20;
  } else if (position === "bottom-right") {
    ctx.textAlign = "right";
    x = canvas.width - 20; y = canvas.height - 20;
  }

  ctx.fillText(text, x, y);
  ctx.globalAlpha = 1.0;
}

document.getElementById("textInput").addEventListener("input", drawWatermark);
document.getElementById("position").addEventListener("change", drawWatermark);
document.getElementById("fontSelect").addEventListener("change", drawWatermark);
document.getElementById("colorPicker").addEventListener("input", drawWatermark);
document.getElementById("opacitySlider").addEventListener("input", drawWatermark);

function downloadImage() {
  const link = document.createElement("a");
  link.download = "watermarked-image.png";
  link.href = canvas.toDataURL();
  link.click();
}

document.getElementById("imageUploader").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      drawWatermark();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
});
