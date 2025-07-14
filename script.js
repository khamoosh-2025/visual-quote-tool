const imageLoader = document.getElementById("imageLoader");
const canvas = document.getElementById("imageCanvas");
const ctx = canvas.getContext("2d");

let currentImage = null;

imageLoader.addEventListener("change", handleImage, false);

function handleImage(e) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      currentImage = img;
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
}

function drawWatermark() {
  if (!currentImage) return;

  ctx.drawImage(currentImage, 0, 0);

  const text = document.getElementById("textInput").value;
  const position = document.getElementById("position").value;
  const font = document.getElementById("fontSelect").value;
  const color = document.getElementById("colorPicker").value;
  const opacity = document.getElementById("opacitySlider").value;

  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.font = `30px ${font}`;

  let x = 10, y = 40;
  if (position === "top-right") {
    x = canvas.width - 200;
    y = 40;
  } else if (position === "bottom-right") {
    x = canvas.width - 200;
    y = canvas.height - 20;
  }

  ctx.fillText(text, x, y);
  ctx.globalAlpha = 1.0;
}

function downloadImage() {
  const link = document.createElement("a");
  link.download = "watermarked-image.png";
  link.href = canvas.toDataURL();
  link.click();
}
