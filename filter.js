
document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const descInput = document.getElementById("descInput");
  const categoryInput = document.getElementById("categoryInput");
  const gallery = document.getElementById("gallery");
  const clearBtn = document.getElementById("clearGalleryBtn");
  const filterSelect = document.getElementById("filterSelect");
  const filterMenu = document.getElementById("filterMenu");

  let savedItems = JSON.parse(localStorage.getItem("galleryItems") || "[]");
  savedItems.forEach((item, index) => addImageToGallery(item, index));
  updateFilterMenu();

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
      updateFilterMenu();
    };
    reader.readAsDataURL(file);
  });

  clearBtn.addEventListener("click", () => {
    if (confirm("حذف کل گالری؟")) {
      localStorage.removeItem("galleryItems");
      gallery.innerHTML = "";
      savedItems = [];
      updateFilterMenu();
    }
  });

  function addImageToGallery(item, index) {
    const box = document.createElement("div");
    box.className = "image-box";
    box.dataset.category = item.category;

    const img = document.createElement("img");
    img.src = item.src;
    img.style.filter = item.filter || "none";

    const meta = document.createElement("div");
    meta.innerHTML = `
      <p><strong>${item.desc || "بدون توضیح"}</strong></p>
      <p><small>🏷️ ${item.category || "بدون دسته"}</small></p>
      <p><small>📅 ${item.timestamp}</small></p>
    `;

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "🗑️";
    delBtn.onclick = () => {
      savedItems.splice(index, 1);
      localStorage.setItem("galleryItems", JSON.stringify(savedItems));
      gallery.innerHTML = "";
      savedItems.forEach((itm, i) => addImageToGallery(itm, i));
      updateFilterMenu();
    };

    box.appendChild(img);
    box.appendChild(meta);
    box.appendChild(delBtn);
    gallery.appendChild(box);
  }

  function updateFilterMenu() {
    const categories = ["all", ...new Set(savedItems.map(i => i.category).filter(Boolean))];
    filterMenu.innerHTML = "";
    categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.textContent = cat === "all" ? "نمایش همه" : cat;
      btn.className = "filter-btn";
      btn.dataset.category = cat;
      if (cat === "all") btn.classList.add("active");
      filterMenu.appendChild(btn);
    });

    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const cat = btn.dataset.category;
        document.querySelectorAll(".image-box").forEach(box => {
          box.style.display = (cat === "all" || box.dataset.category === cat) ? "block" : "none";
        });
      };
    });
  }
});
