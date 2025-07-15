
document.getElementById('imageUploader').addEventListener('change', function(event) {
  const files = event.target.files;
  const gallery = document.getElementById('gallery');
  for (let file of files) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.alt = 'uploaded image';
      img.addEventListener('click', function() {
        showLightbox(e.target.result);
      });
      gallery.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});

function showLightbox(src) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  lightboxImg.src = src;
  lightbox.classList.remove('hidden');
}

document.getElementById('closeBtn').addEventListener('click', function() {
  document.getElementById('lightbox').classList.add('hidden');
});
