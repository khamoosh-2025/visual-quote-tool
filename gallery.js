function openImage(el) {
  const popup = document.getElementById("popup");
  const popupImg = document.getElementById("popupImg");
  popupImg.src = el.src;
  popup.style.display = "flex";
}

function closeImage() {
  document.getElementById("popup").style.display = "none";
}
