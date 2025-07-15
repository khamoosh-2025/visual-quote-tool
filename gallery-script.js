const galleryContainer = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

// Example images (in real case, you might load dynamically)
const images = ['images/sample1.jpg', 'images/sample2.jpg', 'images/sample3.jpg'];

images.forEach(src => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = 'گالری';
  img.onclick = () => openLightbox(src);
  galleryContainer.appendChild(img);
});

function openLightbox(src) {
  lightbox.style.display = 'flex';
  lightboxImg.src = src;
}

function closeLightbox() {
  lightbox.style.display = 'none';
}
