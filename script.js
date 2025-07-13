const imageLoader = document.getElementById('imageLoader');
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');

imageLoader.addEventListener('change', handleImage, false);

function handleImage(e) {
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      drawWatermark();
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
}

function drawWatermark() {
  const text = document.getElementById('textInput').value;
  const position = document.getElementById('position').value;
  const font = document.getElementById('fontSelect').value;
  const color = document.getElementById('colorPicker').value;
  const opacity = parseFloat(document.getElementById('opacitySlider').value);

  if (!text) return;

  ctx.globalAlpha = opacity;
  ctx.font = `36px ${font}`;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';

  let x = canvas.width / 2;
  let y = canvas.height / 2;

  switch (position) {
    case 'top-left':
      x = 50;
      y = 50;
      ctx.textAlign = 'start';
      break;
    case 'top-right':
      x = canvas.width - 50;
      y = 50;
      ctx.textAlign = 'end';
      break;
    case 'bottom-left':
      x = 50;
      y = canvas.height - 50;
      ctx.textAlign = 'start';
      break;
    case 'bottom-right':
      x = canvas.width - 50;
      y = canvas.height - 50;
      ctx.textAlign = 'end';
      break;
    case 'center':
      ctx.textAlign = 'center';
      break;
  }

  ctx.fillText(text, x, y);
  ctx.globalAlpha = 1;
}

document.getElementById('textInput').addEventListener('input', drawWatermark);
document.getElementById('position').addEventListener('change', drawWatermark);
document.getElementById('fontSelect').addEventListener('change', drawWatermark);
document.getElementById('colorPicker').addEventListener('change', drawWatermark);
document.getElementById('opacitySlider').addEventListener('input', drawWatermark);

function downloadImage() {
  const link = document.createElement('a');
  link.download = 'watermarked-image.png';
  link.href = canvas.toDataURL();
  link.click();
}