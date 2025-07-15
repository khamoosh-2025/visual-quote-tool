function searchImages() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const images = document.querySelectorAll('#gallery img');
  images.forEach(img => {
    const altText = img.alt.toLowerCase();
    if (altText.includes(input)) {
      img.style.display = 'inline';
    } else {
      img.style.display = 'none';
    }
  });
}
