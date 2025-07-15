// کامنت چنج: افزودن عملکرد آپلود و نمایش تصویر در گالری
document.getElementById('uploadInput').addEventListener('change', function (event) {
  const files = event.target.files;
  const gallery = document.getElementById('gallery');

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const link = document.createElement('a');
      link.href = e.target.result;
      link.setAttribute('data-lightbox', 'gallery');

      const img = document.createElement('img');
      img.src = e.target.result;

      link.appendChild(img);
      gallery.appendChild(link);
    };
    reader.readAsDataURL(file);
  });
});
