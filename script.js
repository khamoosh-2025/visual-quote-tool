
document.getElementById('uploadInput').addEventListener('change', function (event) {
  const file = event.target.files[0];
  const preview = document.getElementById('imagePreview');
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    preview.src = '';
  }
});

function clearPreview() {
  document.getElementById('uploadInput').value = '';
  document.getElementById('imagePreview').src = '';
}
