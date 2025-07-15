function addWatermark() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const imageInput = document.getElementById("imageInput");
  const text = document.getElementById("textInput").value;
  const position = document.getElementById("position").value;
  const font = document.getElementById("fontSelect").value;
  const color = document.getElementById("colorPicker").value;
  const opacity = document.getElementById("opacitySlider").value;

  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      ctx.font = `30px ${font}`;
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;

      let x = 0, y = 30;
      if (position.includes("bottom")) y = canvas.height - 20;
      if (position.includes("right")) x = canvas.width - ctx.measureText(text).width - 20;
      if (position === "center") {
        x = (canvas.width - ctx.measureText(text).width) / 2;
        y = canvas.height / 2;
      }

      ctx.fillText(text, x, y);
      ctx.globalAlpha = 1.0;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function downloadImage() {
  const canvas = document.getElementById("canvas");
  const link = document.createElement("a");
  link.download = "watermarked-image.png";
  link.href = canvas.toDataURL();
  link.click();
}

// بارگذاری تنظیمات ذخیره‌شده از localStorage هنگام اجرای ابزار
window.addEventListener("DOMContentLoaded", () => {
  const savedText = localStorage.getItem("defaultWatermarkText");
  const savedFont = localStorage.getItem("defaultWatermarkFont");

  if (savedText) {
    document.getElementById("textInput").value = savedText;
  }

  if (savedFont) {
    document.getElementById("fontSelect").value = savedFont;
  }
});