
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("postForm");
  const postsContainer = document.getElementById("posts");

  // بارگذاری دل‌نوشته‌ها
  function loadPosts() {
    const posts = JSON.parse(localStorage.getItem("delneveshteha") || "[]");
    postsContainer.innerHTML = "";
    posts.reverse().forEach(post => {
      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
      postsContainer.appendChild(div);
    });
  }

  // ارسال فرم
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = form.title.value.trim();
    const content = form.content.value.trim();
    if (title && content) {
      const posts = JSON.parse(localStorage.getItem("delneveshteha") || "[]");
      posts.push({ title, content });
      localStorage.setItem("delneveshteha", JSON.stringify(posts));
      form.reset();
      loadPosts();
    }
  });

  loadPosts();
});
