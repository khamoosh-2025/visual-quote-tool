
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let img = new Image();

document.getElementById("upload").addEventListener("change", function(e) {
  let file = e.target.files[0];
  let reader = new FileReader();
  reader.onload = function(event) {
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

function applyChanges() {
  if (!img.src) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);

  const text = document.getElementById("textInput").value;
  const color = document.getElementById("textColor").value;
  const size = document.getElementById("textSize").value;
  const filter = document.getElementById("filterSelect").value;

  if (filter === "grayscale") ctx.filter = "grayscale(100%)";
  else if (filter === "contrast") ctx.filter = "contrast(150%)";
  else if (filter === "brightness") ctx.filter = "brightness(120%)";
  else ctx.filter = "none";

  ctx.drawImage(img, 0, 0);
  ctx.filter = "none";

  ctx.fillStyle = color;
  ctx.font = `${size}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(text, canvas.width / 2, canvas.height - 30);
}

function downloadImage() {
  let link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = canvas.toDataURL();
  link.click();
}
