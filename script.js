const imageInput = document.getElementById("imageInput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

imageInput.addEventListener("change", function(e) {
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

function addWatermark() {
  const text = document.getElementById("textInput").value;
  const position = document.getElementById("position").value;
  const font = document.getElementById("fontSelect").value;
  const color = document.getElementById("colorPicker").value;
  const opacity = parseFloat(document.getElementById("opacitySlider").value);

  ctx.globalAlpha = opacity;
  ctx.font = "40px " + font;
  ctx.fillStyle = color;

  let x = 10, y = 50;
  if (position === "top-right") x = canvas.width - 200;
  if (position === "center") {
    x = canvas.width / 2 - 100;
    y = canvas.height / 2;
  }
  if (position === "bottom-left") {
    y = canvas.height - 30;
  }
  if (position === "bottom-right") {
    x = canvas.width - 200;
    y = canvas.height - 30;
  }

  ctx.fillText(text, x, y);
  ctx.globalAlpha = 1.0;
}

function downloadImage() {
  const link = document.createElement("a");
  link.download = "image-with-text.png";
  link.href = canvas.toDataURL();
  link.click();
}