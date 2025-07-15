document.getElementById('imageInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = document.createElement('img');
    img.src = e.target.result;
    document.getElementById('gallery').appendChild(img);
  };
  reader.readAsDataURL(file);
});
