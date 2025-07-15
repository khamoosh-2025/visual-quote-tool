
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

function applyWatermarks() {
    const text = document.getElementById('watermarkText').value;
    const position = document.getElementById('position').value;
    const watermarks = document.querySelectorAll('.watermark');

    watermarks.forEach(wm => {
        wm.textContent = text;
        wm.style.display = 'block';
        wm.style.top = '';
        wm.style.bottom = '';
        wm.style.left = '';
        wm.style.right = '';

        if (position.includes('top')) {
            wm.style.top = '5px';
        } else {
            wm.style.bottom = '5px';
        }

        if (position.includes('left')) {
            wm.style.left = '5px';
        } else {
            wm.style.right = '5px';
        }
    });
}
