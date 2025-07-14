
const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

imageInput.addEventListener("change", function() {
  const file = imageInput.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      previewImage.src = event.target.result;
    };
    img.src = event.target.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

function addWatermark() {
  const text = document.getElementById("textInput").value;
  const position = document.getElementById("position").value;
  const font = document.getElementById("fontSelect").value;
  const color = document.getElementById("colorPicker").value;
  const opacity = parseFloat(document.getElementById("opacitySlider").value);

  ctx.globalAlpha = opacity;
  ctx.font = `30px ${font}`;
  ctx.fillStyle = color;

  let x = 0, y = 30;
  switch (position) {
    case "top-left": x = 10; y = 30; break;
    case "top-right": x = canvas.width - ctx.measureText(text).width - 10; y = 30; break;
    case "center": x = (canvas.width - ctx.measureText(text).width) / 2; y = canvas.height / 2; break;
    case "bottom-left": x = 10; y = canvas.height - 20; break;
    case "bottom-right": x = canvas.width - ctx.measureText(text).width - 10; y = canvas.height - 20; break;
  }

  ctx.fillText(text, x, y);
  ctx.globalAlpha = 1;
}

function downloadImage() {
  const link = document.createElement("a");
  link.download = "watermarked.png";
  link.href = canvas.toDataURL();
  link.click();
}
