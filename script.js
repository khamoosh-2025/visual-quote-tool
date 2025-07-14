let canvas = document.getElementById("imageCanvas");
let ctx = canvas.getContext("2d");
let uploadedImage = null;

function updateCanvas() {
  if (!uploadedImage) return;

  let text = document.getElementById("textInput").value;
  let position = document.getElementById("position").value;
  let font = document.getElementById("fontSelect").value;
  let color = document.getElementById("colorPicker").value;
  let opacity = parseFloat(document.getElementById("opacitySlider").value);

  canvas.width = uploadedImage.width;
  canvas.height = uploadedImage.height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(uploadedImage, 0, 0);

  ctx.globalAlpha = opacity;
  ctx.font = `40px ${font}`;
  ctx.fillStyle = color;
  ctx.textAlign = "center";

  let x = canvas.width / 2;
  let y = canvas.height / 2;

  switch (position) {
    case "top-left":
      x = 100;
      y = 60;
      break;
    case "top-right":
      x = canvas.width - 100;
      y = 60;
      break;
    case "center":
      x = canvas.width / 2;
      y = canvas.height / 2;
      break;
    case "bottom-left":
      x = 100;
      y = canvas.height - 60;
      break;
    case "bottom-right":
      x = canvas.width - 100;
      y = canvas.height - 60;
      break;
  }

  ctx.fillText(text, x, y);
  ctx.globalAlpha = 1.0;
}

document.getElementById("imageLoader").addEventListener("change", function (e) {
  let file = e.target.files[0];
  let reader = new FileReader();
  reader.onload = function (event) {
    let img = new Image();
    img.onload = function () {
      uploadedImage = img;
      updateCanvas();
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

["textInput", "position", "fontSelect", "colorPicker", "opacitySlider"].forEach(id => {
  document.getElementById(id).addEventListener("input", updateCanvas);
});

function downloadImage() {
  let link = document.createElement("a");
  link.download = "watermarked-image.png";
  link.href = canvas.toDataURL();
  link.click();
}
