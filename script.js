function addWatermark() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const imageInput = document.getElementById('imageInput');
  const textInput = document.getElementById('textInput');
  const position = document.getElementById('position').value;
  const fontSelect = document.getElementById('fontSelect').value;
  const sizeSelect = document.getElementById('sizeSelect').value;
  const color = document.getElementById('colorPicker').value;
  const opacity = parseFloat(document.getElementById('opacitySlider').value);

  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;

      let fontSize = 24;
      if (sizeSelect === 'small') fontSize = 18;
      else if (sizeSelect === 'large') fontSize = 36;
      else if (sizeSelect === 'xlarge') fontSize = 48;

      ctx.font = `${fontSize}px ${fontSelect}`;
      ctx.textAlign = 'center';

      const text = textInput.value || 'ندای دل';
      let x = canvas.width / 2;
      let y = canvas.height / 2;

      switch (position) {
        case 'top-left': x = 50; y = 50; break;
        case 'top-right': x = canvas.width - 50; y = 50; break;
        case 'bottom-left': x = 50; y = canvas.height - 50; break;
        case 'bottom-right': x = canvas.width - 50; y = canvas.height - 50; break;
      }

      ctx.fillText(text, x, y);
      ctx.globalAlpha = 1.0;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function downloadImage() {
  const canvas = document.getElementById('canvas');
  const link = document.createElement('a');
  link.download = 'watermarked-image.png';
  link.href = canvas.toDataURL();
  link.click();
}
