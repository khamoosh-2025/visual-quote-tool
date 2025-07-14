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

function hexToRGBA(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function drawWatermark() {
  if (!uploadedImage) return;

  const text = document.getElementById("textInput").value;
  const font = document.getElementById("fontSelect").value;
  const position = document.getElementById("position").value;
  const color = document.getElementById("colorPicker").value;
  const opacity = document.getElementById("opacitySlider").value;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(uploadedImage, 0, 0);
  ctx.font = `40px ${font}`;
  ctx.fillStyle = hexToRGBA(color, opacity);
  ctx.textAlign = "center";

  let x = canvas.width / 2;
  let y = canvas.height - 60;

  switch (position) {
    case "top-left":
      x = 60; y = 60; break;
    case "top-right":
      x = canvas.width - 60; y = 60; break;
    case "center":
      x = canvas.width / 2; y = canvas.height / 2; break;
    case "bottom-left":
      x = 60; y = canvas.height - 60; break;
    case "bottom-right":
      x = canvas.width - 60; y = canvas.height - 60; break;
  }

  ctx.fillText(text, x, y);
}

function downloadImage() {
  const link = document.createElement("a");
  link.download = "watermarked-image.png";
  link.href = canvas.toDataURL();
  link.click();
}
