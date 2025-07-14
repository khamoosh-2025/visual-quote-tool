
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("modeToggle");
  toggle.addEventListener("change", function () {
    document.body.classList.toggle("dark", toggle.checked);
  });
});
