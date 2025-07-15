
function openPopup(imgElement) {
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    const caption = document.getElementById("caption");
    popup.style.display = "flex";
    popupImg.src = imgElement.src;
    caption.innerText = imgElement.alt;
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}
