function addWatermark() {
  const canvas = document.getElementById("imageCanvas");
  const ctx = canvas.getContext("2d");
  const text = document.getElementById("textInput")?.value || "ندای دل";
  const font = document.getElementById("fontSelect").value;
  const color = document.getElementById("colorPicker").value;
  const opacity = parseFloat(document.getElementById("opacitySlider").value);
  const position = "bottom-right";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = `30px ${font}`;
  ctx.fillStyle = hexToRgba(color, opacity);

  let x = 10, y = 30;
  switch (position) {
    case "bottom-right":
      x = canvas.width - 100;
      y = canvas.height - 50;
      break;
  }

  ctx.fillText(text, x, y);
}

function hexToRgba(hex, opacity) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

["fontSelect", "colorPicker", "opacitySlider"].forEach(id => {
  document.getElementById(id).addEventListener("input", addWatermark);
});