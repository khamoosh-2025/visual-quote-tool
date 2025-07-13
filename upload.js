
document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const descInput = document.getElementById("descInput");
  const gallery = document.getElementById("gallery");

  let savedItems = JSON.parse(localStorage.getItem("galleryItems") || "[]");
  savedItems.forEach(item => addImageToGallery(item.src, item.desc));

  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    const desc = descInput.value.trim();

    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      const src = e.target.result;
      addImageToGallery(src, desc);

      savedItems.push({ src, desc });
      localStorage.setItem("galleryItems", JSON.stringify(savedItems));

      descInput.value = "";
    };
    reader.readAsDataURL(file);
  });

  function addImageToGallery(src, desc) {
    const box = document.createElement("div");
    box.className = "image-box";

    const img = document.createElement("img");
    img.src = src;

    const p = document.createElement("p");
    p.textContent = desc || "بدون توضیح";

    box.appendChild(img);
    box.appendChild(p);
    gallery.appendChild(box);
  }
});
