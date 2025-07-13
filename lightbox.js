
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  document.querySelectorAll(".gallery-item img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    });
  });
});

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}
