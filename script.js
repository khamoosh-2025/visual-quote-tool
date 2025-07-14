let canvas = document.getElementById("imageCanvas");
let ctx = canvas.getContext("2d");
let uploadedImage = null;

// نمایش تصویر بارگذاری شده
document.getElementById("imageLoader").addEventListener("change", function (e) {
  let file = e.target.files[0];
  let reader = new FileReader();

  reader.onload = function (event) {
    let img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      uploadedImage = img;
      updatePreview();
    };
    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
});

// توابع برای بروزرسانی پیش‌نمایش
function updatePreview() {
  if (!uploadedImage) return;

  let text = document.getElementById("textInput").value;
  let position = document.getElementById("position").value;
  let font = document.getElementById("fontSelect").value;
  let color = document.getElementById("colorPicker").value;
  let opacity = parseFloat(document.getElementById("opacitySlider").value);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(uploadedImage, 0, 0);

  ctx.font = `40px ${font}`;
  ctx.fillStyle = hexToRGBA(color, opacity);
  ctx.textAlign = "center";

  let x, y;
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
    case "center":
      x = canvas.width / 2;
      y = canvas.height / 2;
      break;
    case "bottom-left":
      x = 100;
      y = canvas.height - 60;
      ctx.textAlign = "left";
      break;
    case "bottom-right":
      x = canvas.width - 100;
      y = canvas.height - 60;
      ctx.textAlign = "right";
      break;
  }

  ctx.fillText(text, x, y);
}

function hexToRGBA(hex, alpha) {
  let r = parseInt(hex.substr(1, 2), 16);
  let g = parseInt(hex.substr(3, 2), 16);
  let b = parseInt(hex.substr(5, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// رویدادهای همزمان برای پیش‌نمایش
["textInput", "position", "fontSelect", "colorPicker", "opacitySlider"].forEach(id => {
  document.getElementById(id).addEventListener("input", updatePreview);
});

// دانلود تصویر نهایی
function downloadImage() {
  let link = document.createElement("a");
  link.download = "watermarked-image.png";
  link.href = canvas.toDataURL();
  link.click();
}