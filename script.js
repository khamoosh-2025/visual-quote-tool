
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let img = new Image();

document.getElementById('imageInput').addEventListener('change', function(e) {
  const reader = new FileReader();
  reader.onload = function(event) {
    img.onload = () => draw();
    img.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

['textInput', 'position', 'fontSelect', 'colorPicker', 'opacitySlider'].forEach(id => {
  document.getElementById(id).addEventListener('input', draw);
});

function draw() {
  if (!img.src) return;

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);

  const text = document.getElementById('textInput').value;
  const font = document.getElementById('fontSelect').value;
  const position = document.getElementById('position').value;
  const color = document.getElementById('colorPicker').value;
  const opacity = parseFloat(document.getElementById('opacitySlider').value);

  if (!text) return;

  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.font = `30px ${font}`;

  let x = 10, y = 40;
  switch (position) {
    case 'top-right': x = canvas.width - ctx.measureText(text).width - 10; y = 40; break;
    case 'center': x = (canvas.width - ctx.measureText(text).width) / 2; y = canvas.height / 2; break;
    case 'bottom-left': x = 10; y = canvas.height - 20; break;
    case 'bottom-right': x = canvas.width - ctx.measureText(text).width - 10; y = canvas.height - 20; break;
  }

  ctx.fillText(text, x, y);
  ctx.globalAlpha = 1;
}

function downloadImage() {
  const link = document.createElement('a');
  link.download = 'image-with-watermark.png';
  link.href = canvas.toDataURL();
  link.click();
}
