
document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const descInput = document.getElementById("descInput");
  const gallery = document.getElementById("gallery");
  const clearBtn = document.getElementById("clearGalleryBtn");
  const filterSelect = document.getElementById("filterSelect");

  let savedItems = JSON.parse(localStorage.getItem("galleryItems") || "[]");
  savedItems.forEach((item, index) => addImageToGallery(item.src, item.desc, item.filter || "none", index));

  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    const desc = descInput.value.trim();
    const filter = filterSelect.value;

    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      const src = e.target.result;
      savedItems.push({ src, desc, filter });
      localStorage.setItem("galleryItems", JSON.stringify(savedItems));
      addImageToGallery(src, desc, filter, savedItems.length - 1);
      descInput.value = "";
    };
    reader.readAsDataURL(file);
  });

  clearBtn.addEventListener("click", () => {
    if (confirm("آیا مطمئن هستید که می‌خواهید کل گالری را حذف کنید؟")) {
      localStorage.removeItem("galleryItems");
      gallery.innerHTML = "";
      savedItems = [];
    }
  });

  function addImageToGallery(src, desc, filter, index) {
    const box = document.createElement("div");
    box.className = "image-box";

    const img = document.createElement("img");
    img.src = src;
    img.style.filter = filter;

    const p = document.createElement("p");
    p.textContent = desc || "بدون توضیح";

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "🗑️";
    delBtn.onclick = () => {
      savedItems.splice(index, 1);
      localStorage.setItem("galleryItems", JSON.stringify(savedItems));
      gallery.innerHTML = "";
      savedItems.forEach((item, i) => addImageToGallery(item.src, item.desc, item.filter, i));
    };

    box.appendChild(img);
    box.appendChild(p);
    box.appendChild(delBtn);
    gallery.appendChild(box);
  }
});
