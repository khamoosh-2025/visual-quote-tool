
function openLightbox(imageElement) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  lightbox.style.display = "flex";
  lightboxImg.src = imageElement.src;
  caption.textContent = imageElement.alt;
}
function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}
