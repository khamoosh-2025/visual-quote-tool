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

function downloadImage() {
  if (!uploadedImage) return;

  let text = document.getElementById("textInput").value;
  let font = document.getElementById("fontSelect").value;
  let position = document.getElementById("position").value;
  let color = document.getElementById("colorPicker").value;
  let opacity = parseFloat(document.getElementById("opacitySlider").value);

  ctx.drawImage(uploadedImage, 0, 0);

  ctx.font = `40px ${font}`;
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity;
  ctx.textAlign = "center";

  let x = canvas.width / 2;
  let y = canvas.height / 2;

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
  ctx.globalAlpha = 1;
}