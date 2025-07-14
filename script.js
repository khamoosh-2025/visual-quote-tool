function addWatermark() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const imgInput = document.getElementById("imageInput").files[0];
  const text = document.getElementById("textInput").value;
  const position = document.getElementById("position").value;
  const font = document.getElementById("fontSelect").value;
  const color = document.getElementById("colorPicker").value;
  const opacity = document.getElementById("opacitySlider").value;
  const angle = parseFloat(document.getElementById("rotation").value) || 0;

  if (!imgInput) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.font = "30px " + font;

      let x = 10;
      let y = 40;
      if (position === "top-right") {
        x = canvas.width - 200;
        y = 40;
      } else if (position === "center") {
        x = canvas.width / 2 - 100;
        y = canvas.height / 2;
      } else if (position === "bottom-left") {
        x = 10;
        y = canvas.height - 20;
      } else if (position === "bottom-right") {
        x = canvas.width - 200;
        y = canvas.height - 20;
      }

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.fillText(text, -canvas.width / 2 + x, -canvas.height / 2 + y);
      ctx.restore();
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(imgInput);
}

function downloadImage() {
  const canvas = document.getElementById("canvas");
  const link = document.createElement("a");
  link.download = "watermarked-image.png";
  link.href = canvas.toDataURL();
  link.click();
}
