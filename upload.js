
document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const descInput = document.getElementById("descInput");
  const categoryInput = document.getElementById("categoryInput");
  const gallery = document.getElementById("gallery");
  const clearBtn = document.getElementById("clearGalleryBtn");
  const filterSelect = document.getElementById("filterSelect");

  let savedItems = JSON.parse(localStorage.getItem("galleryItems") || "[]");
  savedItems.forEach((item, index) => addImageToGallery(item, index));

  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    const desc = descInput.value.trim();
    const category = categoryInput.value.trim();
    const filter = filterSelect.value;
    const timestamp = new Date().toLocaleString("fa-IR");

    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      const src = e.target.result;
      const item = { src, desc, category, filter, timestamp };
      savedItems.push(item);
      localStorage.setItem("galleryItems", JSON.stringify(savedItems));
      addImageToGallery(item, savedItems.length - 1);
      descInput.value = "";
      categoryInput.value = "";
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

  function addImageToGallery(item, index) {
    const box = document.createElement("div");
    box.className = "image-box";

    const img = document.createElement("img");
    img.src = item.src;
    img.style.filter = item.filter || "none";

    const meta = document.createElement("div");
    meta.innerHTML = `
      <p><strong>توضیح:</strong> ${item.desc || "بدون توضیح"}</p>
      <p><strong>دسته:</strong> ${item.category || "نامشخص"}</p>
      <p><strong>تاریخ:</strong> ${item.timestamp || ""}</p>
    `;

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "🗑️";
    delBtn.onclick = () => {
      savedItems.splice(index, 1);
      localStorage.setItem("galleryItems", JSON.stringify(savedItems));
      gallery.innerHTML = "";
      savedItems.forEach((itm, i) => addImageToGallery(itm, i));
    };

    box.appendChild(img);
    box.appendChild(meta);
    box.appendChild(delBtn);
    gallery.appendChild(box);
  }
});
