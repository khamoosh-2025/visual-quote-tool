function setPresetText() {
  const presetSelect = document.getElementById("presetText");
  const textInput = document.getElementById("textInput");
  const selectedValue = presetSelect.value;

  if (selectedValue) {
    textInput.value = selectedValue;
  }
}

// توابع addWatermark و downloadImage همان قبلی باقی می‌مانند یا به طور جداگانه در پروژه قرار دارند.
