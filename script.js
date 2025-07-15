function uploadImage() {
  const input = document.getElementById('imageInput');
  const gallery = document.getElementById('gallery');
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = document.createElement('img');
    img.src = e.target.result;
    img.alt = "تصویر آپلود شده";
    img.addEventListener('click', () => previewImage(img));
    gallery.appendChild(img);
  };
  reader.readAsDataURL(file);
}

function previewImage(imgElement) {
  const modal = document.getElementById('previewModal');
  const preview = document.getElementById('previewImage');
  preview.src = imgElement.src;
  modal.style.display = 'flex';
}

function closePreview() {
  document.getElementById('previewModal').style.display = 'none';
}