let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let uploadedImage = null;

const textInput = document.getElementById("textInput");
const position = document.getElementById("position");
const fontSelect = document.getElementById("fontSelect");
const colorPicker = document.getElementById("colorPicker");
const opacitySlider = document.getElementById("opacitySlider");

document.getElementById("imageInput").addEventListener("change", function (e) {
  let file = e.target.files[0];
  let reader = new FileReader();

  reader.onload = function (event) {
    let img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      uploadedImage = img;
      updateCanvas();
    };
    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
});

[textInput, position, fontSelect, colorPicker, opacitySlider].forEach(el => {
  el.addEventListener("input", updateCanvas);
});

function updateCanvas() {
  if (!uploadedImage) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(uploadedImage, 0, 0);

  let text = textInput.value;
  let font = fontSelect.value;
  let color = colorPicker.value;
  let opacity = parseFloat(opacitySlider.value);

  ctx.font = `40px ${font}`;
  ctx.fillStyle = hexToRgba(color, opacity);
  ctx.textAlign = "center";

  let x = canvas.width / 2;
  let y = canvas.height / 2;

  switch (position.value) {
    case "top-left":
      x = 100; y = 60; break;
    case "top-right":
      x = canvas.width - 100; y = 60; break;
    case "bottom-left":
      x = 100; y = canvas.height - 40; break;
    case "bottom-right":
      x = canvas.width - 100; y = canvas.height - 40; break;
    case "center":
    default:
      x = canvas.width / 2;
      y = canvas.height / 2;
  }

  ctx.fillText(text, x, y);
}

function hexToRgba(hex, opacity) {
  let bigint = parseInt(hex.slice(1), 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return `rgba(${r},${g},${b},${opacity})`;
}

function downloadImage() {
  let link = document.createElement("a");
  link.download = "visual-quote.png";
  link.href = canvas.toDataURL();
  link.click();
}