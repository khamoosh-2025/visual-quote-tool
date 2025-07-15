const canvas = document.getElementById('signaturePad');
const ctx = canvas.getContext('2d');

let isDrawing = false;

canvas.addEventListener('mousedown', start);
canvas.addEventListener('mouseup', stop);
canvas.addEventListener('mouseout', stop);
canvas.addEventListener('mousemove', draw);

// برای موبایل
canvas.addEventListener('touchstart', start);
canvas.addEventListener('touchend', stop);
canvas.addEventListener('touchcancel', stop);
canvas.addEventListener('touchmove', draw);

function getPosition(e) {
  const rect = canvas.getBoundingClientRect();
  if (e.touches) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  } else {
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
}

function start(e) {
  isDrawing = true;
  const pos = getPosition(e);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
  e.preventDefault();
}

function draw(e) {
  if (!isDrawing) return;
  const pos = getPosition(e);
  ctx.lineTo(pos.x, pos.y);
  ctx.strokeStyle = document.getElementById('penColor').value;
  ctx.lineWidth = document.getElementById('penWidth').value;
  ctx.lineCap = 'round';
  ctx.stroke();
  e.preventDefault();
}

function stop(e) {
  if (isDrawing) {
    ctx.closePath();
    isDrawing = false;
  }
}

function clearSignature() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveSignature() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement('a');
  link.href = image;
  link.download = 'signature.png';
  link.click();
}
