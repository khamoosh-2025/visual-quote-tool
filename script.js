
function addWatermark() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const imageInput = document.getElementById('imageInput');
  const file = imageInput.files[0];

  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // قاب
      const frameType = document.getElementById('frameSelect').value;
      if (frameType === "black") {
        ctx.lineWidth = 20;
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
      } else if (frameType === "gold") {
        ctx.lineWidth = 20;
        ctx.strokeStyle = "gold";
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
      }

      // واترمارک
      const text = document.getElementById('textInput').value;
      const position = document.getElementById('position').value;
      const color = document.getElementById('colorPicker').value;
      const opacity = parseFloat(document.getElementById('opacitySlider').value);
      const font = document.getElementById('fontSelect').value;

      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.font = "30px " + font;

      let x = 10, y = 40;
      if (position === "top-right") { x = canvas.width - ctx.measureText(text).width - 10; y = 40; }
      else if (position === "center") { x = canvas.width / 2 - ctx.measureText(text).width / 2; y = canvas.height / 2; }
      else if (position === "bottom-left") { x = 10; y = canvas.height - 20; }
      else if (position === "bottom-right") { x = canvas.width - ctx.measureText(text).width - 10; y = canvas.height - 20; }

      ctx.fillText(text, x, y);
      ctx.globalAlpha = 1.0;
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function downloadImage() {
  const canvas = document.getElementById('canvas');
  const link = document.createElement('a');
  link.download = 'image-with-watermark.png';
  link.href = canvas.toDataURL();
  link.click();
}
