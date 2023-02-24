# toc-creator

> _Create a **draggable** table of contents for your articles_

[Preview](https://github.com/bullshitking-99/toc-creator/blob/master/src/assets/toc-creator.gif?raw=true)

[中文介绍就在下方，请点我带飞](#Chinese)

## Features

### Base

#### Automatic generated

- Put it anywhere in your page component, it will recognize all heading elements `(h2~h6)` in the specified tag when the page is loaded, and the table of contents will be automatically generated the moment the page appears.

#### Click to jump

- Feel free to click on a tabbed item in the TOC and it will scroll smoothly to the middle of the page.

#### Scroll Monitoring

- During your browsing, it will monitor your scrolling behavior, and automatically light up the title you are currently reading, so that you always know where you are.

### Draggable

- Move the mouse to the top of the directory, and hold down the directory bar, accompanied by silky animations and interactive prompts, it can move to any corner of the screen with your mouse!
- No need for complicated position control, this feature makes it adaptable to any kind of document layout.

### hide

- When you don't have enough space on the screen or don't need it temporarily, click the collapse button on the right side of the directory bar to hide the directory directly, and open it at will when you need it again.

### Performance

- You may be worried that the `js` and `rendering` overhead caused by scroll monitoring and dragging will affect your application, But please rest assured, without affecting the experience, I have reduced the rendering burden caused by `js` execution and dragging , striving to maintain a balance between experience and burden.

## Get Start

This component is made with `vue3 + ts` and works out of the box

```HTML
<template>
   <main>
   // As long as it can appear on the page, it can be placed anywhere
     <TocCreator></TocCreator>
     <article>...</article>
   </main>
</template>
```

### Install

- global

```TypeScript
// no braces
import TocCreator from "toc-creator";
import "toc-creator/dist/style.css";

const app = createApp(App);

app.use(TocCreator);
```

- local

```TypeScript
<script lang="ts" setup>
// with braces
import { TocCreator } from "toc-creator";
import "toc-creator/dist/style.css";
</script>
```

### Attributes

In order to keep the table of contents as correct as possible and improve the scope of application, `toc-creator` provides two optional attributes:

```TypeScript
interfaceProps {
   // Article parent component label - receive css selector
   // avoid interference from unrelated label elements
   container?: string;
   // Scroll detection source - receive responsive data
   // prevent from being unable to rely on window's native scrolling events
   scrollTop?: Ref<number>;
}
const props = withDefaults(defineProps<Props>(), {
   container: "",
});

```

Please note that in most cases, you don't need to transfer any attributes, only do that when you find that the component does not work properly, such as irrelevant TOC items and scrolling detection failure.

## Flag

In the future, I will ...

- Ported to browser plugin
- optimize mobile support
- add dark theme
- ...

If `toc-creator` helps you, maybe you can move to [`github`](https://github.com/bullshitking-99/toc-creator) and order a shiny little star, love you~ 😊

---

<div id='Chinese'>---</div>

## 功能介绍

### 基础

#### 自动生成

- 将它放在你页面组件的任何地方，它将在页面挂载时识别指定标签内所有的标题元素 `(h2~h6)`，在页面出现的那一刻目录便已自动生成完毕。

#### 点击跳转

- 随意点击目录中的标签项吧，它会平滑地滚动到页面的中间。

#### 滚动监测

- 在你浏览的途中，它会监听你的滚动行为，自动将点亮你当前在读的标题，让你时刻知道自己身处何地。

### 可拖拽

- 将鼠标移到目录顶部，并按住目录栏，伴随着丝滑的动画和交互提示，它能随着你的鼠标移动到屏幕的任何一个角落！
- 无需繁杂的位置控制，这个特性让它可以适应任何一种文档布局。

### 隐藏

- 当你屏幕上的空间不够或暂时不需要它时，点击目录栏右边的折叠按钮，可直接隐藏目录，当然在你又需要它时可随意打开。

### 性能

- 你可能担心滚动监听以及拖拽带来的`js`和渲染开销影响你的应用，但请放心，在不影响体验的前提下，我减少了`js`的执行次数并减少了拖拽时带来的渲染负担，努力维持体验和负担的平衡。

## 使用

该组件使用 vue3+ts 制作，开箱即用

```HTML
<template>
  <main>
  // 只要能出现在页面，放哪都行捏
    <TocCreator></TocCreator>
    <article>...</article>
  </main>
</template>
```

### 引用

- 全局引用

```TypeScript
// 没有大括号
import TocCreator from "toc-creator";
import "toc-creator/dist/style.css";

const app = createApp(App);

app.use(TocCreator);
```

- 局部引用

```TypeScript
<script lang="ts" setup>
// 有大括号
import { TocCreator } from "toc-creator";
import "toc-creator/dist/style.css";
</script>
```

### 属性

为了尽可能保持目录的正确性并提高适用范围，`toc-creator`提供了两个可选属性：

```TypeScript
interface Props {
  // 文章父组件标签 - 接收css选择器 - 避免无关标签元素干扰
  container?: string;
  // 滚动检测源 - 接收响应式数据 - 防止无法依赖window原生滚动事件
  scrollTop?: Ref<number>;
}
const props = withDefaults(defineProps<Props>(), {
  container: "",
});

```

请注意，在大部分情况下，你不用传任何属性，只当你发现组件无法正常工作时，如出现无关目录项和滚动监测失效时，传入必要的信息。

## 画饼

在未来，我会添加...

- 移植至浏览器插件
- 更好的移动端支持
- 深色主题
- ...

如果`toc-creator`帮助到了你，或许可以移步 github 点一颗闪亮的小红星哦，爱你~ 😊
