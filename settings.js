function saveSettings() {
  const text = document.getElementById("defaultText").value;
  const font = document.getElementById("defaultFont").value;

  localStorage.setItem("defaultWatermarkText", text);
  localStorage.setItem("defaultFontFamily", font);

  document.getElementById("statusMessage").innerText = "تنظیمات ذخیره شد ✅";
}
