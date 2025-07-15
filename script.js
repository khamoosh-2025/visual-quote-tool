
// کمنت چنج: افزودن جستجوگر داینامیک برای مقالات
function searchArticles() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toLowerCase();
  const ul = document.getElementById("articleList");
  const li = ul.getElementsByTagName('li');

  for (let i = 0; i < li.length; i++) {
    let a = li[i].getElementsByTagName("a")[0];
    let txtValue = a.textContent || a.innerText;
    li[i].style.display = txtValue.toLowerCase().includes(filter) ? "" : "none";
  }
}
