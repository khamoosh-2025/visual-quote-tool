document.getElementById('imageInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const preview = document.getElementById('preview');

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.src = e.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

function clearImage() {
  const preview = document.getElementById('preview');
  preview.src = '';
  preview.style.display = 'none';
  document.getElementById('imageInput').value = '';
}
