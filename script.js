
function openFullscreen(img) {
  const container = document.getElementById('fullscreenContainer');
  const fullscreenImage = document.getElementById('fullscreenImage');
  fullscreenImage.src = img.src;
  container.style.display = 'flex';
}

function closeFullscreen() {
  const container = document.getElementById('fullscreenContainer');
  container.style.display = 'none';
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeFullscreen();
  }
});
