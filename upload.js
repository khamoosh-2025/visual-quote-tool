
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("imageInput");
  const gallery = document.getElementById("gallery");

  // نمایش تصاویر ذخیره‌شده
  const savedImages = JSON.parse(localStorage.getItem("uploadedImages") || "[]");
  savedImages.forEach(src => addImageToGallery(src));

  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      const src = e.target.result;
      addImageToGallery(src);

      // ذخیره در localStorage
      savedImages.push(src);
      localStorage.setItem("uploadedImages", JSON.stringify(savedImages));
    };
    reader.readAsDataURL(file);
  });

  function addImageToGallery(src) {
    const img = document.createElement("img");
    img.src = src;
    gallery.appendChild(img);
  }
});
