(function () {
  "use strict";

  var posts = window.BLOG_POSTS || [];
  var categoryColors = { "写作": "lavender", "生活": "green", "学习": "orange" };

  function formatDate(date) {
    return date.replace(/-/g, ".");
  }

  var activeCategory = "全部";

  function renderCategoryFilters() {
    var filters = document.getElementById("category-filters");
    if (!filters) return;
    var categories = ["全部"].concat(Array.from(new Set(posts.map(function (post) { return post.category; }))));
    filters.innerHTML = categories.map(function (category) {
      var selected = category === activeCategory;
      return '<button class="filter-chip' + (selected ? ' is-active' : '') + '" type="button" data-category="' + category + '" aria-pressed="' + selected + '">' + category + '</button>';
    }).join("");
  }

  function renderPostList() {
    var list = document.getElementById("post-list");
    var count = document.getElementById("post-count");
    if (!list) return;
    var search = (document.getElementById("post-search") || {}).value || "";
    search = search.trim().toLocaleLowerCase();
    var visiblePosts = posts.filter(function (post) {
      var matchesCategory = activeCategory === "全部" || post.category === activeCategory;
      var searchableText = [post.title, post.summary, post.category].join(" ").toLocaleLowerCase();
      return matchesCategory && searchableText.indexOf(search) !== -1;
    });
    if (count) count.textContent = visiblePosts.length + " / " + posts.length + " 篇文章";
    if (visiblePosts.length === 0) {
      list.innerHTML = '<p class="empty-state">没有找到匹配的文章，试试其他关键词或分类。</p>';
      return;
    }
    list.innerHTML = visiblePosts.map(function (post) {
      var color = categoryColors[post.category] || "lavender";
      return '<article class="post-card">' +
        '<a class="post-card-link" href="posts/' + post.slug + '.html" aria-label="阅读：' + post.title + '">' +
          '<div class="post-meta"><time datetime="' + post.date + '">' + formatDate(post.date) + '</time><span class="tag tag-' + color + '">' + post.category + '</span></div>' +
          '<h3>' + post.title + '</h3><p>' + post.summary + '</p><span class="read-more">阅读全文 <span aria-hidden="true">↗</span></span>' +
        '</a></article>';
    }).join("");
  }

  function renderArticle() {
    var container = document.getElementById("article-content");
    if (!container) return;
    var post = posts.find(function (item) { return item.slug === container.getAttribute("data-slug"); });
    if (!post) {
      container.innerHTML = '<h1>找不到这篇文章</h1><p>请返回首页，从文章列表中选择一篇文章。</p>';
      return;
    }
    document.title = post.title + " · 我的小博客";
    var color = categoryColors[post.category] || "lavender";
    container.innerHTML = '<header class="article-header"><div class="post-meta"><time datetime="' + post.date + '">' + formatDate(post.date) + '</time><span class="tag tag-' + color + '">' + post.category + '</span></div><h1>' + post.title + '</h1><p class="article-summary">' + post.summary + '</p></header><div class="article-body">' + post.paragraphs.map(function (paragraph) { return '<p>' + paragraph + '</p>'; }).join("") + '</div>';
  }

  renderCategoryFilters();
  renderPostList();
  var searchInput = document.getElementById("post-search");
  if (searchInput) searchInput.addEventListener("input", renderPostList);
  var categoryFilters = document.getElementById("category-filters");
  if (categoryFilters) categoryFilters.addEventListener("click", function (event) {
    var button = event.target.closest("button[data-category]");
    if (!button) return;
    activeCategory = button.getAttribute("data-category");
    renderCategoryFilters();
    renderPostList();
  });
  renderArticle();
}());
