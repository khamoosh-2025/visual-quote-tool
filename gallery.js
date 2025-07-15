function addCustomImage() {
  const input = document.getElementById('uploadInput');
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      document.getElementById('gallery').appendChild(img);
    };
    reader.readAsDataURL(file);
  }
}
