
// comment change: گالری - بارگذاری تصاویر
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("gallery");
  images.forEach(img => {
    const image = document.createElement("img");
    image.src = img.src;
    image.alt = img.alt;
    container.appendChild(image);
  });
});
