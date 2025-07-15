const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let originalImage = new Image();

imageInput.addEventListener('change', e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
    originalImage.onload = function() {
      canvas.width = originalImage.width;
      canvas.height = originalImage.height;
      ctx.drawImage(originalImage, 0, 0);
    }
    originalImage.src = event.target.result;
  }
  reader.readAsDataURL(file);
});

function applyEffect() {
  const effect = document.getElementById('effectSelect').value;
  ctx.drawImage(originalImage, 0, 0); // Reset
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  if (effect === 'pencil') {
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i+1] + data[i+2]) / 3;
      data[i] = data[i+1] = data[i+2] = avg > 128 ? 255 : 0;
    }
  } else if (effect === 'oil') {
    for (let i = 0; i < data.length; i += 4) {
      data[i] += 20; // Red
      data[i+1] += 10; // Green
      data[i+2] -= 10; // Blue
    }
  } else if (effect === 'cartoon') {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = (data[i] > 128) ? 255 : 0;
      data[i+1] = (data[i+1] > 128) ? 255 : 0;
      data[i+2] = (data[i+2] > 128) ? 255 : 0;
    }
  } else if (effect === 'blur') {
    ctx.filter = "blur(3px)";
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = "none";
    return;
  }

  ctx.putImageData(imageData, 0, 0);
}

function downloadImage() {
  const link = document.createElement('a');
  link.download = 'photo-art.png';
  link.href = canvas.toDataURL();
  link.click();
}
