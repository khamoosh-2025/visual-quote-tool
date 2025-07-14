let selectedImage = null;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

document.getElementById('imageInput').addEventListener('change', function (e) {
  const container = document.getElementById('imagePreviewContainer');
  container.innerHTML = '';
  const files = e.target.files;

  for (let i = 0; i < files.length; i++) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(files[i]);
    img.dataset.index = i;
    img.addEventListener('click', () => selectImage(img, files[i]));
    container.appendChild(img);
  }
});

function selectImage(imgElement, file) {
  const allImages = document.querySelectorAll('#imagePreviewContainer img');
  allImages.forEach(img => img.classList.remove('selected'));
  imgElement.classList.add('selected');

  const reader = new FileReader();
  reader.onload = function (e) {
    const image = new Image();
    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0);
      selectedImage = image;
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function addWatermark() {
  if (!selectedImage) return;
  const text = document.getElementById('textInput').value;
  const font = document.getElementById('fontSelect').value;
  const position = document.getElementById('position').value;
  const color = document.getElementById('colorPicker').value;
  const opacity = parseFloat(document.getElementById('opacitySlider').value);

  ctx.globalAlpha = opacity;
  ctx.font = '40px ' + font;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';

  let x = canvas.width / 2;
  let y = canvas.height / 2;

  switch (position) {
    case 'top-left':
      x = 50; y = 50; break;
    case 'top-right':
      x = canvas.width - 50; y = 50; break;
    case 'bottom-left':
      x = 50; y = canvas.height - 50; break;
    case 'bottom-right':
      x = canvas.width - 50; y = canvas.height - 50; break;
  }

  ctx.fillText(text, x, y);
  ctx.globalAlpha = 1.0;
}

function downloadImage() {
  if (!selectedImage) return;
  const link = document.createElement('a');
  link.download = 'watermarked-image.png';
  link.href = canvas.toDataURL();
  link.click();
}
