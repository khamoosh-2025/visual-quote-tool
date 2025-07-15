// Comment change: settings.js - ذخیره تنظیمات شخصی کاربر در localStorage
document.getElementById("settingsForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const settings = {
    font: document.getElementById("defaultFont").value,
    position: document.getElementById("defaultPosition").value,
    color: document.getElementById("defaultColor").value,
    size: document.getElementById("defaultSize").value,
    bgColor: document.getElementById("bgColor").value
  };

  localStorage.setItem("userSettings", JSON.stringify(settings));
  alert("تنظیمات ذخیره شد!");
});
