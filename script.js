
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

document.getElementById("imageInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

function addWatermark() {
  const text = document.getElementById("textInput").value;
  const position = document.getElementById("position").value;
  const font = document.getElementById("fontSelect").value;
  const color = document.getElementById("colorPicker").value;
  const opacity = document.getElementById("opacitySlider").value;

  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.font = "36px " + font;
  ctx.textAlign = "center";

  let x = canvas.width / 2;
  let y = canvas.height / 2;

  switch (position) {
    case "top-left":
      x = 50;
      y = 50;
      ctx.textAlign = "start";
      break;
    case "top-right":
      x = canvas.width - 50;
      y = 50;
      ctx.textAlign = "end";
      break;
    case "center":
      break;
    case "bottom-left":
      x = 50;
      y = canvas.height - 50;
      ctx.textAlign = "start";
      break;
    case "bottom-right":
      x = canvas.width - 50;
      y = canvas.height - 50;
      ctx.textAlign = "end";
      break;
  }

  ctx.fillText(text, x, y);
  ctx.globalAlpha = 1.0;
}

function downloadImage() {
  const link = document.createElement("a");
  link.download = "watermarked-image.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
