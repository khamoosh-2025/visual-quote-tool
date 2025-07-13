function generateImage() {
  const quote = document.getElementById('quoteText').value;
  const author = document.getElementById('authorName').value;
  const output = document.getElementById('output');
  if (!quote.trim()) {
    alert("لطفاً نقل‌قول را وارد کنید");
    return;
  }
  output.innerHTML = `<div style='border:1px solid #ccc; padding:10px; font-size:18px; background:white;'>
    <p>"${quote}"</p><p style='text-align:left;'>— ${author}</p>
  </div>`;
}