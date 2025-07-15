
function saveSettings() {
  const font = document.getElementById('fontSelect').value;
  const mode = document.getElementById('modeToggle').value;

  localStorage.setItem('preferredFont', font);
  localStorage.setItem('displayMode', mode);

  applySettings();
}

function applySettings() {
  const font = localStorage.getItem('preferredFont') || 'Shabnam';
  const mode = localStorage.getItem('displayMode') || 'light';

  document.body.style.fontFamily = font;
  document.body.className = (mode === 'dark') ? 'dark-mode' : '';
}

window.onload = applySettings;
