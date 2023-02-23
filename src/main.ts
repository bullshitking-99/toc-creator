import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";
import "./assets/vuepress-theme.css";

// 导入代码高亮 hljs
import hljs from "highlight.js";
import "highlight.js/styles/a11y-dark.css";
// hljs配置
hljs.configure({
  ignoreUnescapedHTML: true, // post页面因为目录遍历node节点而莫名其妙警告
});

const app = createApp(App);

// 注册一个全局指令
// 这会在使用元素的 mounted 和 updated 时都调用
app.directive("highlight", function (el) {
  let elems: HTMLElement[] = el.querySelectorAll("pre code");
  elems.forEach((elem) => {
    hljs.highlightElement(elem);
  });
});

app.mount("#app");
