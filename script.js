const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function loadImageToCanvas(imgSrc) {
  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  };
  img.src = imgSrc;
}

document.getElementById("bgImageInput").addEventListener("change", function (e) {
  const reader = new FileReader();
  reader.onload = function (event) {
    loadImageToCanvas(event.target.result);
  };
  reader.readAsDataURL(e.target.files[0]);
});

function loadSampleImage(path) {
  loadImageToCanvas(path);
}

function addWatermark() {
  const text = document.getElementById("textInput").value;
  const font = document.getElementById("fontSelect").value;
  const color = document.getElementById("colorPicker").value;
  const opacity = parseFloat(document.getElementById("opacitySlider").value);
  const position = document.getElementById("position").value;

  ctx.globalAlpha = opacity;
  ctx.font = "30px " + font;
  ctx.fillStyle = color;

  let x = 10, y = 30;
  if (position === "top-right") {
    x = canvas.width - ctx.measureText(text).width - 10;
    y = 30;
  } else if (position === "center") {
    x = (canvas.width - ctx.measureText(text).width) / 2;
    y = canvas.height / 2;
  } else if (position === "bottom-left") {
    x = 10;
    y = canvas.height - 20;
  } else if (position === "bottom-right") {
    x = canvas.width - ctx.measureText(text).width - 10;
    y = canvas.height - 20;
  }

  ctx.fillText(text, x, y);
  ctx.globalAlpha = 1.0;
}

function downloadImage() {
  const link = document.createElement('a');
  link.download = 'image_with_watermark.png';
  link.href = canvas.toDataURL();
  link.click();
}
