document.addEventListener("DOMContentLoaded", function () {
  const fileList = document.getElementById("fileList");
  const archive = JSON.parse(localStorage.getItem("fileArchive") || "[]");

  if (archive.length === 0) {
    fileList.innerHTML = "<li>هیچ فایلی در آرشیو نیست.</li>";
    return;
  }

  archive.forEach(fileName => {
    const li = document.createElement("li");
    li.textContent = fileName;
    fileList.appendChild(li);
  });
});