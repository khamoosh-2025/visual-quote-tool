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
  let opacity = document.getElementById("opacitySlider").value;

  ctx.drawImage(uploadedImage, 0, 0);
  ctx.font = `40px ${font}`;
  ctx.fillStyle = hexToRgba(color, opacity);
  ctx.textAlign = "center";

  let x, y;
  switch (position) {
    case "top-left":
      x = 100; y = 60; break;
    case "top-right":
      x = canvas.width - 100; y = 60; break;
    case "center":
      x = canvas.width / 2; y = canvas.height / 2; break;
    case "bottom-left":
      x = 100; y = canvas.height - 60; break;
    case "bottom-right":
      x = canvas.width - 100; y = canvas.height - 60; break;
  }

  ctx.fillText(text, x, y);
  
  let link = document.createElement("a");
  link.download = "watermarked-image.png";
  link.href = canvas.toDataURL();
  link.click();
}

function hexToRgba(hex, opacity) {
  let bigint = parseInt(hex.slice(1), 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return `rgba(${r},${g},${b},${opacity})`;
}