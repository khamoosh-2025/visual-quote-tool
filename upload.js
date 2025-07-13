
document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const descInput = document.getElementById("descInput");
  const gallery = document.getElementById("gallery");

  let savedItems = JSON.parse(localStorage.getItem("galleryItems") || "[]");
  savedItems.forEach((item, index) => addImageToGallery(item.src, item.desc, index));

  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    const desc = descInput.value.trim();

    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      const src = e.target.result;
      savedItems.push({ src, desc });
      localStorage.setItem("galleryItems", JSON.stringify(savedItems));
      addImageToGallery(src, desc, savedItems.length - 1);
      descInput.value = "";
    };
    reader.readAsDataURL(file);
  });

  function addImageToGallery(src, desc, index) {
    const box = document.createElement("div");
    box.className = "image-box";

    const img = document.createElement("img");
    img.src = src;

    const p = document.createElement("p");
    p.textContent = desc || "بدون توضیح";

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "🗑️";
    delBtn.onclick = () => {
      savedItems.splice(index, 1);
      localStorage.setItem("galleryItems", JSON.stringify(savedItems));
      gallery.innerHTML = "";
      savedItems.forEach((item, i) => addImageToGallery(item.src, item.desc, i));
    };

    box.appendChild(img);
    box.appendChild(p);
    box.appendChild(delBtn);
    gallery.appendChild(box);
  }
});
