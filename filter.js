
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
    
    const shareBtn = document.createElement("button");
    shareBtn.textContent = "📤 اشتراک‌گذاری";
    shareBtn.className = "share-btn";
    shareBtn.onclick = () => {
      if (navigator.share) {
        navigator.share({
          title: item.desc || "تصویر گالری",
          text: item.desc || "یک تصویر جالب از گالری من",
          files: [dataURLtoFile(item.src, "gallery-image.png")]
        });
      } else {
        alert("اشتراک‌گذاری توسط مرورگر پشتیبانی نمی‌شود.");
      }
    };

    const printBtn = document.createElement("button");
    printBtn.textContent = "🖨️ چاپ تصویر";
    printBtn.className = "print-btn";
    printBtn.onclick = () => {
      const win = window.open();
      win.document.write('<img src="' + item.src + '" style="max-width:100%">');
      win.print();
      win.close();
    };

    box.appendChild(shareBtn);
    box.appendChild(printBtn);
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


function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}


const bgColorPicker = document.getElementById("bgColorPicker");
const bgImageInput = document.getElementById("bgImageInput");
const resetBtn = document.getElementById("resetBackground");

bgColorPicker.addEventListener("input", () => {
  document.body.style.background = bgColorPicker.value;
  localStorage.setItem("bgColor", bgColorPicker.value);
  localStorage.removeItem("bgImage");
});

bgImageInput.addEventListener("change", (e) => {
  let file = e.target.files[0];
  let reader = new FileReader();
  reader.onload = function(event) {
    document.body.style.background = `url(${event.target.result}) no-repeat center center / cover`;
    localStorage.setItem("bgImage", event.target.result);
    localStorage.removeItem("bgColor");
  };
  reader.readAsDataURL(file);
});

resetBtn.addEventListener("click", () => {
  document.body.style.background = "";
  localStorage.removeItem("bgColor");
  localStorage.removeItem("bgImage");
});

// اعمال پس‌زمینه ذخیره‌شده
window.addEventListener("load", () => {
  const savedColor = localStorage.getItem("bgColor");
  const savedImage = localStorage.getItem("bgImage");
  if (savedColor) {
    document.body.style.background = savedColor;
    bgColorPicker.value = savedColor;
  } else if (savedImage) {
    document.body.style.background = `url(${savedImage}) no-repeat center center / cover`;
  }
});


const deleteSelectedBtn = document.getElementById("deleteSelectedBtn");
let selectedItems = new Set();

deleteSelectedBtn.addEventListener("click", () => {
  if (selectedItems.size === 0) {
    alert("هیچ تصویری انتخاب نشده است.");
    return;
  }

  const confirmDelete = confirm("آیا از حذف تصاویر انتخاب‌شده اطمینان دارید؟");
  if (confirmDelete) {
    selectedItems.forEach(box => box.remove());
    selectedItems.clear();
    saveGallery();
  }
});

function createBox(item) {
  const box = document.createElement("div");
  box.className = "image-box";

  const img = document.createElement("img");
  img.src = item.src;
  img.alt = item.desc;

  const desc = document.createElement("p");
  desc.textContent = item.desc;

  box.appendChild(img);
  box.appendChild(desc);

  const delBtn = document.createElement("button");
  delBtn.textContent = "🗑️ حذف";
  delBtn.className = "delete-btn";
  delBtn.onclick = () => {
    box.remove();
    saveGallery();
  };

  const selBtn = document.createElement("button");
  selBtn.textContent = "✔️ انتخاب";
  selBtn.className = "select-btn";
  selBtn.onclick = () => {
    box.classList.toggle("selected");
    if (selectedItems.has(box)) {
      selectedItems.delete(box);
    } else {
      selectedItems.add(box);
    }
  };

  box.appendChild(selBtn);
  box.appendChild(delBtn);
  gallery.appendChild(box);
}


const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const items = gallery.querySelectorAll(".image-box");
  items.forEach(item => {
    const desc = item.querySelector("p").textContent.toLowerCase();
    const tags = item.getAttribute("data-tags") || "";
    item.style.display = (desc.includes(keyword) || tags.includes(keyword)) ? "" : "none";
  });
});

function createBox(item) {
  const box = document.createElement("div");
  box.className = "image-box";

  const img = document.createElement("img");
  img.src = item.src;
  img.alt = item.desc;

  const desc = document.createElement("p");
  desc.textContent = item.desc;

  const tagsDiv = document.createElement("div");
  tagsDiv.className = "tag-list";
  tagsDiv.textContent = item.tags ? `برچسب‌ها: ${item.tags}` : "";

  box.setAttribute("data-tags", item.tags.toLowerCase());

  box.appendChild(img);
  box.appendChild(desc);
  box.appendChild(tagsDiv);

  const delBtn = document.createElement("button");
  delBtn.textContent = "🗑️ حذف";
  delBtn.className = "delete-btn";
  delBtn.onclick = () => {
    box.remove();
    saveGallery();
  };

  const selBtn = document.createElement("button");
  selBtn.textContent = "✔️ انتخاب";
  selBtn.className = "select-btn";
  selBtn.onclick = () => {
    box.classList.toggle("selected");
    if (selectedItems.has(box)) {
      selectedItems.delete(box);
    } else {
      selectedItems.add(box);
    }
  };

  box.appendChild(selBtn);
  box.appendChild(delBtn);
  gallery.appendChild(box);
}
