
function generateImage() {
  const text = document.getElementById('text-input').value;
  const font = document.getElementById('font-select').value;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 400;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000';
  ctx.font = '40px ' + font;
  ctx.textAlign = 'center';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const output = document.getElementById('image-output');
  output.innerHTML = '';
  output.appendChild(canvas);
  const link = document.getElementById('download-link');
  link.href = canvas.toDataURL('image/png');
}
    