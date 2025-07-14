let canvas = document.getElementById("imageCanvas");
let ctx = canvas.getContext("2d");
let uploadedImage = null;

// بارگذاری عکس
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
      drawWatermark(); // پیش‌نمایش پس از بارگذاری
    };
    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
});

// پیش‌نمایش زنده واترمارک
document.getElementById("textInput").addEventListener("input", drawWatermark);
document.getElementById("fontSelect").addEventListener("change", drawWatermark);
document.getElementById("colorPicker").addEventListener("input", drawWatermark);
document.getElementById("opacitySlider").addEventListener("input", drawWatermark);
document.getElementById("position").addEventListener("change", drawWatermark);

// دکمه دانلود
function downloadImage() {
  let link = document.createElement("a");
  link.download = "watermarked-image.png";
  link.href = canvas.toDataURL();
  link.click();
}

// دکمه بازنشانی
function resetCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (uploadedImage) {
    ctx.drawImage(uploadedImage, 0, 0);
  }
  document.getElementById("textInput").value = "";
}

// تابع اصلی افزودن واترمارک
function drawWatermark() {
  if (!uploadedImage) return;

  ctx.drawImage(uploadedImage, 0, 0);

  let text = document.getElementById("textInput").value;
  let font = document.getElementById("fontSelect").value;
  let color = document.getElementById("colorPicker").value;
  let opacity = document.getElementById("opacitySlider").value;
  let position = document.getElementById("position").value;

  ctx.globalAlpha = opacity;
  ctx.font = `40px ${font}`;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // افکت سایه
  ctx.shadowColor = "black";
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 4;

  let x, y;
  switch (position) {
    case "top-left":
      x = 100; y = 60;
      break;
    case "top-right":
      x = canvas.width - 100; y = 60;
      break;
    case "center":
      x = canvas.width / 2; y = canvas.height / 2;
      break;
    case "bottom-left":
      x = 100; y = canvas.height - 60;
      break;
    case "bottom-right":
      x = canvas.width - 100; y = canvas.height - 60;
      break;
  }

  ctx.fillText(text, x, y);
  ctx.globalAlpha = 1.0;
}
