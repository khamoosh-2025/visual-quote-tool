const canvas = document.getElementById("imageCanvas");
const ctx = canvas.getContext("2d");
let uploadedImage = null;

document.getElementById("imageLoader").addEventListener("change", function (e) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      uploadedImage = img;
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

function downloadImage() {
  const link = document.createElement("a");
  link.download = "watermarked-image.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function drawWatermark() {
  if (!uploadedImage) return;

  const text = document.getElementById("textInput").value;
  const font = document.getElementById("fontSelect").value;
  const position = document.getElementById("position").value;
  const color = document.getElementById("colorPicker").value;
  const opacity = parseFloat(document.getElementById("opacitySlider").value);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(uploadedImage, 0, 0);

  ctx.font = `40px ${font}`;
  ctx.fillStyle = hexToRgba(color, opacity);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const xMid = canvas.width / 2;
  const yMid = canvas.height / 2;

  let x = xMid;
  let y = yMid;

  switch (position) {
    case "top-left":
      x = 100;
      y = 50;
      break;
    case "top-right":
      x = canvas.width - 100;
      y = 50;
      break;
    case "center":
      x = xMid;
      y = yMid;
      break;
    case "bottom-left":
      x = 100;
      y = canvas.height - 50;
      break;
    case "bottom-right":
      x = canvas.width - 100;
      y = canvas.height - 50;
      break;
  }

  ctx.fillText(text, x, y);
}

function hexToRgba(hex, opacity) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// آپدیت خودکار هنگام تغییر مقادیر
["textInput", "fontSelect", "position", "colorPicker", "opacitySlider"].forEach(id => {
  document.getElementById(id).addEventListener("input", drawWatermark);
});
