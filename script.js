
// 🎯 Comment Change: popup-script
function openPopup(src) {
  const popup = document.getElementById('popup');
  const popupImage = document.getElementById('popupImage');
  popupImage.src = src;
  popup.style.display = 'flex';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

// افزودن به همه تصاویر گالری:
document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(".gallery img");
  galleryImages.forEach(img => {
    img.addEventListener("click", () => {
      openPopup(img.src);
    });
  });
});
