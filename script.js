function generateImage() {
  const canvas = document.getElementById("quoteCanvas");
  const ctx = canvas.getContext("2d");
  const quote = document.getElementById("quote").value;
  const watermark = document.getElementById("watermark").value;

  // زمینه مشکی
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // متن نقل‌قول
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 20px sans-serif";
  ctx.textAlign = "center";
  wrapText(ctx, quote, canvas.width / 2, 100, 400, 30);

  // واترمارک پایین
  ctx.fillStyle = "#888";
  ctx.font = "14px sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(watermark, canvas.width - 10, canvas.height - 20);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}