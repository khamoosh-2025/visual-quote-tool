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

function drawWatermark() {
  if (!uploadedImage) return;

  // اطلاعات ورودی
  let text = document.getElementById("textInput").value;
  let font = document.getElementById("fontSelect").value;
  let position = document.getElementById("position").value;
  let color = document.getElementById("colorPicker").value;
  let opacity = document.getElementById("opacitySlider").value;

  // بازسازی تصویر اصلی
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(uploadedImage, 0, 0);

  // تنظیمات فونت و رنگ
  ctx.font = `40px ${font}`;
  ctx.fillStyle = hexToRGBA(color, opacity);
  ctx.textAlign = "center";

  // محاسبه موقعیت
  let x = canvas.width / 2;
  let y = canvas.height / 2;

  switch (position) {
    case "top-left":
      x = 100;
      y = 60;
      ctx.textAlign = "left";
      break;
    case "top-right":
      x = canvas.width - 100;
      y = 60;
      ctx.textAlign = "right";
      break;
    case "bottom-left":
      x = 100;
      y = canvas.height - 40;
      ctx.textAlign = "left";
      break;
    case "bottom-right":
      x = canvas.width - 100;
      y = canvas.height - 40;
      ctx.textAlign = "right";
      break;
    case "center":
    default:
      x = canvas.width / 2;
      y = canvas.height / 2;
      ctx.textAlign = "center";
      break;
  }

  // درج واترمارک
  ctx.fillText(text, x, y);
}

function downloadImage() {
  drawWatermark(); // اطمینان از اعمال واترمارک قبل از دانلود
  let link = document.createElement("a");
  link.download = "watermarked-image.png";
  link.href = canvas.toDataURL();
  link.click();
}

function hexToRGBA(hex, opacity) {
  let r = parseInt(hex.substr(1, 2), 16);
  let g = parseInt(hex.substr(3, 2), 16);
  let b = parseInt(hex.substr(5, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// تغییرات هنگام تایپ یا انتخاب کاربر
document.getElementById("textInput").addEventListener("input", drawWatermark);
document.getElementById("fontSelect").addEventListener("change", drawWatermark);
document.getElementById("position").addEventListener("change", drawWatermark);
document.getElementById("colorPicker").addEventListener("input", drawWatermark);
document.getElementById("opacitySlider").addEventListener("input", drawWatermark);