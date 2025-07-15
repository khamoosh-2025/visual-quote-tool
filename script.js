// script.js
// مدیریت افزودن تصویر به گالری
function addImage() {
  const input = document.getElementById('imageInput');
  const gallery = document.getElementById('gallery');

  if (input.files.length === 0) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = document.createElement('img');
    img.src = e.target.result;
    gallery.appendChild(img);

    storedImages.push(e.target.result);
    localStorage.setItem('images', JSON.stringify(storedImages));
  };
  reader.readAsDataURL(input.files[0]);
}

window.onload = function () {
  const gallery = document.getElementById('gallery');
  storedImages.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    gallery.appendChild(img);
  });
};
