let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let image = new Image();

document.getElementById("imageInput").addEventListener("change", function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
    image.onload = function() {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
    };
    image.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

function addWatermark() {
  const text = document.getElementById("textInput").value;
  const position = document.getElementById("position").value;
  const font = document.getElementById("fontSelect").value;
  const color = document.getElementById("colorPicker").value;
  const opacity = document.getElementById("opacitySlider").value;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0);

  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.font = "30px " + font;

  let x = 0, y = 30;
  if (position === "top-left") { x = 10; y = 30; }
  else if (position === "top-right") { x = canvas.width - ctx.measureText(text).width - 10; y = 30; }
  else if (position === "center") { x = (canvas.width - ctx.measureText(text).width) / 2; y = canvas.height / 2; }
  else if (position === "bottom-left") { x = 10; y = canvas.height - 20; }
  else if (position === "bottom-right") { x = canvas.width - ctx.measureText(text).width - 10; y = canvas.height - 20; }

  ctx.fillText(text, x, y);
  ctx.globalAlpha = 1.0;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0);
}

function downloadImage() {
  const link = document.createElement("a");
  link.download = "watermarked-image.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}