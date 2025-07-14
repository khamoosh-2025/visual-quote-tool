window.onload = function () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const sampleImage = new Image();
  sampleImage.src = 'sample.jpg';

  sampleImage.onload = function () {
    canvas.width = sampleImage.width;
    canvas.height = sampleImage.height;
    ctx.drawImage(sampleImage, 0, 0);
    drawText('ندای دل', 'bottom-right');
  };
};

function drawText(text, position) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const opacity = document.getElementById('opacitySlider').value;
  const color = document.getElementById('colorPicker').value;
  const font = document.getElementById('fontSelect').value;

  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.font = '30px ' + font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  let x = canvas.width / 2;
  let y = canvas.height / 2;

  switch (position) {
    case 'top-left':
      x = 60; y = 40;
      break;
    case 'top-right':
      x = canvas.width - 60; y = 40;
      break;
    case 'bottom-left':
      x = 60; y = canvas.height - 40;
      break;
    case 'bottom-right':
      x = canvas.width - 60; y = canvas.height - 40;
      break;
  }

  ctx.fillText(text, x, y);
}

function addWatermark() {
  const text = document.getElementById('textInput').value;
  const position = document.getElementById('position').value;
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  drawText(text, position);
}

function downloadImage() {
  const canvas = document.getElementById('canvas');
  const link = document.createElement('a');
  link.download = 'watermarked-image.png';
  link.href = canvas.toDataURL();
  link.click();
}