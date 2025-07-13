
function generateImage() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const text = document.getElementById("textInput").value;
  const font = document.getElementById("fontSelect").value;

  canvas.width = 800;
  canvas.height = 400;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
  ctx.font = "40px " + font;
  ctx.textAlign = "center";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const link = document.getElementById("downloadLink");
  link.href = canvas.toDataURL();
}
