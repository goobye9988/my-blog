# 我的小博客

一个使用 HTML、CSS 和原生 JavaScript 编写的静态博客。文章保存在项目内的 JavaScript 文件中，不需要数据库、登录系统或付费 API。

## 项目结构

```text
my-blog/
├── index.html                 # 首页、文章列表、搜索和分类筛选
├── README.md                  # 项目说明
├── data/
│   └── posts.js               # 本地文章数据与正文
├── assets/
│   ├── css/style.css          # 页面样式
│   └── js/main.js             # 首页列表和文章页渲染逻辑
└── posts/
    ├── first-step.html        # 第一篇文章的独立阅读页
    ├── slow-morning.html      # 第二篇文章的独立阅读页
    └── learn-by-making.html   # 第三篇文章的独立阅读页
```

## 本地预览

在 Termux 中打开项目目录：

```sh
cd ~/my-blog
```

如果安装了 Python，可以启动本地网页服务器：

```sh
python -m http.server 8000
```

然后在浏览器访问 `http://localhost:8000`。停止预览时，在 Termux 按 `Ctrl+C`。

也可以用浏览器直接打开 `index.html`；此项目使用普通本地脚本文件，无需构建步骤。

## 添加或修改文章

1. 用文本编辑器打开 `data/posts.js`。
2. 在 `window.BLOG_POSTS` 数组中编辑现有文章，或复制一篇文章对象并修改字段：
   - `slug`：英文短名称，用于文章页文件名。
   - `title`：标题。
   - `date`：日期，格式为 `YYYY-MM-DD`。
   - `category`：分类。
   - `summary`：首页摘要。
   - `paragraphs`：正文段落数组，每个数组项目是一段。
3. 每篇文章需要有一个对应的独立 HTML 页面，放在 `posts/` 目录中，文件名为 `<slug>.html`。复制已有页面后，将 `data-slug` 改成文章的 `slug`，并保持相对路径写法。
4. 保存文件并刷新浏览器即可看到修改。

文章正文使用普通文本填写。当前示例使用纯文本段落，不需要编写 HTML 标签。
