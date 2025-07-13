const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const textInput = document.getElementById('textInput');
const fontSelect = document.getElementById('fontSelect');
const bgColorPicker = document.getElementById('bgColorPicker');
const bgImageLoader = document.getElementById('bgImageLoader');

canvas.width = 800;
canvas.height = 400;

function drawBackground(callback) {
  const bgColor = bgColorPicker.value;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const file = bgImageLoader.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        callback();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    callback();
  }
}

function drawText() {
  const text = textInput.value;
  ctx.font = `48px ${fontSelect.value}`;
  ctx.fillStyle = '#000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
}

function generateImage() {
  drawBackground(drawText);
}

document.getElementById('downloadBtn').addEventListener('click', function () {
  const link = document.getElementById('downloadBtn');
  link.href = canvas.toDataURL();
});
