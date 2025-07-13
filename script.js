
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
const imageLoader = document.getElementById('imageLoader');
let img = new Image();

imageLoader.addEventListener('change', handleImage, false);

function handleImage(e){
  const reader = new FileReader();
  reader.onload = function(event){
    img.onload = function(){
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img,0,0);
    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);     
}

function downloadImage() {
  const text = document.getElementById('textInput').value;
  const position = document.getElementById('position').value;
  const color = document.getElementById('colorPicker').value;
  const opacity = parseFloat(document.getElementById('opacitySlider').value);

  ctx.drawImage(img, 0, 0);
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  const selectedFont = document.getElementById("fontSelect").value;
  ctx.font = "36px " + selectedFont;
  ctx.textAlign = "right";

  let x = 0, y = 0;
  switch(position) {
    case 'top-left': x = 20; y = 40; break;
    case 'top-right': x = canvas.width - 20; y = 40; ctx.textAlign = "right"; break;
    case 'center': x = canvas.width / 2; y = canvas.height / 2; ctx.textAlign = "center"; break;
    case 'bottom-left': x = 20; y = canvas.height - 20; break;
    case 'bottom-right': x = canvas.width - 20; y = canvas.height - 20; ctx.textAlign = "right"; break;
  }

  ctx.fillText(text, x, y);
  ctx.globalAlpha = 1.0;

  const link = document.createElement('a');
  link.download = 'watermarked.png';
  link.href = canvas.toDataURL();
  link.click();
}
