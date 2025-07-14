let canvas = document.getElementById("imageCanvas");
let ctx = canvas.getContext("2d");
let uploadedImage = null;

document.getElementById("imageLoader").addEventListener("change", function (e) {
  let file = e.target.files[0];
  let reader = new FileReader();

  reader.onload = function (event) {
    let img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      uploadedImage = img;
    };
    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
});

function drawWatermark() {
  if (!uploadedImage) return;

  let text = document.getElementById("textInput").value;
  let font = document.getElementById("fontSelect").value;
  let color = document.getElementById("colorPicker").value;
  let opacity = document.getElementById("opacitySlider").value;
  let position = document.getElementById("position").value;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(uploadedImage, 0, 0);

  ctx.font = `40px ${font}`;
  ctx.fillStyle = hexToRgba(color, opacity);
  ctx.textAlign = "center";

  let x = canvas.width / 2;
  let y = canvas.height / 2;

  switch (position) {
    case "top-left":
      x = 60;
      y = 60;
      ctx.textAlign = "left";
      break;
    case "top-right":
      x = canvas.width - 60;
      y = 60;
      ctx.textAlign = "right";
      break;
    case "center":
      x = canvas.width / 2;
      y = canvas.height / 2;
      break;
    case "bottom-left":
      x = 60;
      y = canvas.height - 60;
      ctx.textAlign = "left";
      break;
    case "bottom-right":
      x = canvas.width - 60;
      y = canvas.height - 60;
      ctx.textAlign = "right";
      break;
  }

  ctx.fillText(text, x, y);
}

function removeWatermark() {
  if (!uploadedImage) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(uploadedImage, 0, 0);
}

function downloadImage() {
  let link = document.createElement("a");
  link.download = "watermarked-image.png";
  link.href = canvas.toDataURL();
  link.click();
}

function hexToRgba(hex, opacity) {
  let bigint = parseInt(hex.replace("#", ""), 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// هر بار که ورودی‌ها تغییر کند، واترمارک بروزرسانی می‌شود
document.getElementById("textInput").addEventListener("input", drawWatermark);
document.getElementById("fontSelect").addEventListener("change", drawWatermark);
document.getElementById("colorPicker").addEventListener("change", drawWatermark);
document.getElementById("opacitySlider").addEventListener("input", drawWatermark);
document.getElementById("position").addEventListener("change", drawWatermark);