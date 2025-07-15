
// افزودن نمایش پیغام موفقیت و پاک‌کردن فرم پس از کلیک دکمه
document.getElementById("contactForm").addEventListener("submit", function(event){
  event.preventDefault();
  document.getElementById("success-message").style.display = "block";
  setTimeout(() => {
    document.getElementById("success-message").style.display = "none";
    document.getElementById("contactForm").reset();
  }, 5000);
});
