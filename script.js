
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const imageInput = document.getElementById("imageInput");
const textInput = document.getElementById("textInput");
const fontSelect = document.getElementById("fontSelect");
const positionSelect = document.getElementById("position");
const colorPicker = document.getElementById("colorPicker");
const opacitySlider = document.getElementById("opacitySlider");

let image = new Image();

imageInput.addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (event) {
    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
    };
    image.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

function addWatermark() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0);

  const text = textInput.value;
  const font = fontSelect.value;
  const position = positionSelect.value;
  const color = colorPicker.value;
  const opacity = parseFloat(opacitySlider.value);

  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.font = "36px " + font;
  ctx.textAlign = "center";

  let x = canvas.width / 2;
  let y = canvas.height / 2;

  switch (position) {
    case "top-left":
      x = 60;
      y = 50;
      ctx.textAlign = "left";
      break;
    case "top-right":
      x = canvas.width - 60;
      y = 50;
      ctx.textAlign = "right";
      break;
    case "bottom-left":
      x = 60;
      y = canvas.height - 30;
      ctx.textAlign = "left";
      break;
    case "bottom-right":
      x = canvas.width - 60;
      y = canvas.height - 30;
      ctx.textAlign = "right";
      break;
  }

  ctx.fillText(text, x, y);
  ctx.globalAlpha = 1;
}

function downloadImage() {
  const link = document.createElement("a");
  link.download = "watermarked-image.png";
  link.href = canvas.toDataURL();
  link.click();
}
