document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.getElementById("gallery");

  const imageCount = 6; // تعداد تصاویر آزمایشی

  for (let i = 1; i <= imageCount; i++) {
    const img = document.createElement("img");
    img.src = `gallery/image${i}.jpg`;
    img.alt = `تصویر ${i}`;
    galleryContainer.appendChild(img);
  }
});
