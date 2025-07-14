let canvas = document.getElementById("imageCanvas");
let ctx = canvas.getContext("2d");
let uploadedImage = null;

function addWatermark() {
  if (!uploadedImage) return;

  let text = document.getElementById("textInput").value;
  let font = document.getElementById("fontSelect").value;
  let color = document.getElementById("colorPicker").value;
  let opacity = parseFloat(document.getElementById("opacitySlider").value);
  let position = document.getElementById("position").value;

  ctx.drawImage(uploadedImage, 0, 0);

  ctx.font = `40px ${font}`;
  ctx.fillStyle = `rgba(${hexToRgb(color)}, ${opacity})`;
  ctx.textAlign = "center";

  let x = canvas.width / 2;
  let y = canvas.height - 60;

  switch (position) {
    case "top-left":
      x = 100; y = 50; break;
    case "top-right":
      x = canvas.width - 100; y = 50; break;
    case "center":
      x = canvas.width / 2; y = canvas.height / 2; break;
    case "bottom-left":
      x = 100; y = canvas.height - 50; break;
    case "bottom-right":
      x = canvas.width - 100; y = canvas.height - 50; break;
  }

  ctx.fillText(text, x, y);
}

function downloadImage() {
  addWatermark();
  let link = document.createElement("a");
  link.download = "watermarked-image.png";
  link.href = canvas.toDataURL();
  link.click();
}

function hexToRgb(hex) {
  var bigint = parseInt(hex.slice(1), 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  return r + "," + g + "," + b;
}

// Drag & Drop
let dropZone = document.getElementById("dropZone");

dropZone.addEventListener("dragover", function (e) {
  e.preventDefault();
  dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", function (e) {
  e.preventDefault();
  dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop", function (e) {
  e.preventDefault();
  dropZone.classList.remove("dragover");

  let file = e.dataTransfer.files[0];
  if (file) {
    handleImage(file);
  }
});

document.getElementById("imageLoader").addEventListener("change", function (e) {
  let file = e.target.files[0];
  if (file) {
    handleImage(file);
  }
});

function handleImage(file) {
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
}
