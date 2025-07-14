const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let image = new Image();

document.getElementById("imageInput").addEventListener("change", function(e) {
  const reader = new FileReader();
  reader.onload = function(event) {
    image.onload = function() {
      drawImageWithBorder();
    };
    image.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

function drawImageWithBorder() {
  const borderWidth = parseInt(document.getElementById("borderSize").value, 10);
  const borderColor = document.getElementById("borderColor").value;

  canvas.width = image.width + borderWidth * 2;
  canvas.height = image.height + borderWidth * 2;

  ctx.fillStyle = borderColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, borderWidth, borderWidth);
}

function addWatermark() {
  const text = document.getElementById("textInput").value;
  const position = document.getElementById("position").value;
  const font = document.getElementById("fontSelect").value;
  const color = document.getElementById("colorPicker").value;
  const opacity = parseFloat(document.getElementById("opacitySlider").value);

  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.font = `24px ${font}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  let x, y;

  switch (position) {
    case "top-left":
      x = 50;
      y = 50;
      break;
    case "top-right":
      x = canvas.width - 50;
      y = 50;
      break;
    case "center":
      x = canvas.width / 2;
      y = canvas.height / 2;
      break;
    case "bottom-left":
      x = 50;
      y = canvas.height - 50;
      break;
    case "bottom-right":
      x = canvas.width - 50;
      y = canvas.height - 50;
      break;
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
