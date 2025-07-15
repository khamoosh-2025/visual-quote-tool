
document.addEventListener('DOMContentLoaded', () => {
  const textInput = document.getElementById('textInput');
  const fontSelect = document.getElementById('fontSelect');
  const positionSelect = document.getElementById('position');
  const colorPicker = document.getElementById('colorPicker');
  const opacitySlider = document.getElementById('opacitySlider');

  // Load settings from localStorage
  if (localStorage.getItem('watermarkText')) {
    textInput.value = localStorage.getItem('watermarkText');
  }
  if (localStorage.getItem('watermarkFont')) {
    fontSelect.value = localStorage.getItem('watermarkFont');
  }
  if (localStorage.getItem('watermarkPosition')) {
    positionSelect.value = localStorage.getItem('watermarkPosition');
  }
  if (localStorage.getItem('watermarkColor')) {
    colorPicker.value = localStorage.getItem('watermarkColor');
  }
  if (localStorage.getItem('watermarkOpacity')) {
    opacitySlider.value = localStorage.getItem('watermarkOpacity');
  }

  // Save settings to localStorage on change
  textInput.addEventListener('input', () => {
    localStorage.setItem('watermarkText', textInput.value);
  });
  fontSelect.addEventListener('change', () => {
    localStorage.setItem('watermarkFont', fontSelect.value);
  });
  positionSelect.addEventListener('change', () => {
    localStorage.setItem('watermarkPosition', positionSelect.value);
  });
  colorPicker.addEventListener('change', () => {
    localStorage.setItem('watermarkColor', colorPicker.value);
  });
  opacitySlider.addEventListener('input', () => {
    localStorage.setItem('watermarkOpacity', opacitySlider.value);
  });
});

function addWatermark() {
  const imageInput = document.getElementById('imageInput');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const text = document.getElementById('textInput').value;
      const font = document.getElementById('fontSelect').value;
      const position = document.getElementById('position').value;
      const color = document.getElementById('colorPicker').value;
      const opacity = parseFloat(document.getElementById('opacitySlider').value);

      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.font = `40px ${font}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      let x = canvas.width / 2;
      let y = canvas.height / 2;

      switch (position) {
        case 'top-left':
          x = 100;
          y = 100;
          break;
        case 'top-right':
          x = canvas.width - 100;
          y = 100;
          break;
        case 'bottom-left':
          x = 100;
          y = canvas.height - 100;
          break;
        case 'bottom-right':
          x = canvas.width - 100;
          y = canvas.height - 100;
          break;
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
