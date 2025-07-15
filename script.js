const input = document.getElementById('imageInput');
const gallery = document.getElementById('gallery');

input.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const imageURL = e.target.result;
    saveImageToStorage(imageURL);
    addImageToGallery(imageURL);
  };
  reader.readAsDataURL(file);
});

function addImageToGallery(src) {
  const img = document.createElement('img');
  img.src = src;
  gallery.appendChild(img);
}

function saveImageToStorage(dataURL) {
  const images = JSON.parse(localStorage.getItem('galleryImages')) || [];
  images.push(dataURL);
  localStorage.setItem('galleryImages', JSON.stringify(images));
}

function loadImagesFromStorage() {
  const images = JSON.parse(localStorage.getItem('galleryImages')) || [];
  images.forEach(addImageToGallery);
}

function clearGallery() {
  localStorage.removeItem('galleryImages');
  gallery.innerHTML = '';
}

window.onload = loadImagesFromStorage;
