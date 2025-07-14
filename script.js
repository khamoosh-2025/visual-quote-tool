function addWatermark() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const imageInput = document.getElementById("imageInput");
  const text = document.getElementById("textInput").value;
  const position = document.getElementById("position").value;
  const font = document.getElementById("fontSelect").value;
  const color = document.getElementById("colorPicker").value;
  const opacity = parseFloat(document.getElementById("opacitySlider").value);
  const size = document.getElementById("sizeSelect").value;

  let width = 800, height = 800;
  if (size === "small") { width = height = 400; }
  else if (size === "large") { width = height = 1200; }

  canvas.width = width;
  canvas.height = height;

  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);

      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.font = "30px " + font;
      ctx.textAlign = "center";

      let x = width / 2;
      let y = height / 2;
      if (position === "top-left") { x = 100; y = 50; }
      else if (position === "top-right") { x = width - 100; y = 50; }
      else if (position === "bottom-left") { x = 100; y = height - 50; }
      else if (position === "bottom-right") { x = width - 100; y = height - 50; }

      ctx.fillText(text, x, y);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(imageInput.files[0]);
}

function downloadImage() {
  const canvas = document.getElementById("canvas");
  const link = document.createElement("a");
  link.download = "watermarked.png";
  link.href = canvas.toDataURL();
  link.click();
}
