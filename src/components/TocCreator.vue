<script lang="ts" setup>
import { inject, onMounted, Ref, ref, watch } from "vue";
import { searchInsert, draggable } from "../utils";

// toc组件 - 标题元素集合
const headElems = ref<NodeListOf<HTMLElement> | any>();

// 获取文档滚动实时高度
let scrollTop = ref<number>(0);
// 监听浏览器滚动事件
window.addEventListener("scroll", function () {
  scrollTop.value = window.pageYOffset;
});

// 获取文档滚动实时高度
// let scrollTop: Ref<number>;
// 不可用原生 window api 则使用 inject 获取
// scrollTop = inject("scrollTop") as Ref<number>;

// toc操作都得等dom渲染完
onMounted(() => {
  // 获取拖拽dom，使其可拖拽
  const dragBar = document.getElementsByClassName("dragBar")[0] as HTMLElement;
  const toc = document.getElementsByClassName("toc")[0] as HTMLElement;
  draggable(dragBar, toc);

  // NodeList是类数组，不具有某些数组方法如 map，为了非要用map我转成数组
  headElems.value = Array.from(document.querySelectorAll("h2,h3,h4"));
  // console.log(headElems.value instanceof Array); // false，惊了,是类数组

  // 元素相对文档高度  = elem.getBoundingClientRect() + 当前页面滚动
  // 初始时页面滚动为0
  const relativeHeightArr = headElems.value.map(
    (ele: HTMLElement, index: number) => {
      return ele.getBoundingClientRect().top;
    }
  );

  // 上一个被点亮的toc
  let lastIndex: number;

  watch(scrollTop, (newVal: number) => {
    // watch的回调参数会自动解包
    // 滚动高度 + 视口高度/2 = 监测点
    const point = newVal + document.documentElement.clientHeight / 2;
    // 包含监测点的标题序号
    const curIndex = searchInsert(relativeHeightArr, point);

    // 判断亮点切换
    if (lastIndex !== curIndex) {
      // 取消上一个点亮
      document
        .querySelector(`#toc-${lastIndex}`)
        ?.classList.toggle("toc-choosen");

      // 点亮当前
      document
        .querySelector(`#toc-${curIndex}`)
        ?.classList.toggle("toc-choosen");

      // 更新前标题
      lastIndex = curIndex;
    }
  });
});

function clickh() {
  console.log("1111");
}
</script>

<template>
  <!-- toc组件 -->
  <div class="toc remove">
    <button class="dragBar" @click="clickh">=</button>
    <ul>
      <!-- 为了防止标题内容一致，给每个标题加上唯一的id -->
      <!-- 为了设置各级标题的不同样式，添加了类，h1标签类为item-1，h2标签类为item-2 -->
      <li
        v-for="(item, index) in headElems"
        :id="`toc-${index}`"
        :class="`item-${item.tagName.charAt(1)}`"
        @click="item.scrollIntoView({ behavior: 'smooth', block: 'center' })"
      >
        {{ item.innerText }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.toc {
  position: fixed;
  z-index: 1;
  transition: all 0.2s ease;
  // 提升拖拽移动速度
  // transition: transform 0.2s ease;
  top: 200px;
  left: 20px;
  cursor: pointer;
  color: rgba(3, 21, 34, 0.644);
  border-radius: 0 10px 10px 0;

  // 拖拽栏
  .dragBar {
    width: 100%;
    font-size: 25px;
    border: none;
    position: relative;
    height: 30px;
    z-index: 2;
    text-align: center;
    user-select: none;
    transition: all 0.3s ease;
    border-radius: 0 10px 0 0;
    transform: translateY(25px);
    background-color: #476582;

    // 避免鼠标滑出后样式变化，增加渲染成本
    &:active {
      transform: translateY(10px);
      & + ul {
        box-shadow: none;
        transform: translateY(5px);
      }
    }
  }

  &:hover {
    .dragBar {
      transform: translateY(10px);
    }
    ul {
      transform: translateY(5px);
    }
  }

  ul {
    position: relative;
    z-index: 3;
    background-color: white;
    padding: 15px 0;
    border-left: 3px solid #c3b4b4;
    box-shadow: 0px 2px 30px rgba(128, 128, 128, 0.455);
    border-radius: 0 10px 10px 0;
    transition: all 0.3s ease;

    li {
      user-select: none;
      box-sizing: border-box;
      list-style: none;
      width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      background: transparent;
      transition: all 0.5s ease;
      padding: 2px 0px;
      border-left: 3px solid transparent;
      transform: translateX(-3px);
      border-radius: 0 3px 3px 0;
    }

    li:hover {
      background-color: #ffebeb;
      border-left: 3px solid #cf5659;
    }

    .toc-choosen {
      background-color: rgba(27, 31, 35, 0.1);
      border-left: 3px solid #cf5659;
      color: #476582;
    }

    .item-2 {
      font-weight: 600;
      padding-left: 13px;
    }
    .item-3 {
      padding-left: 23px;
      opacity: 0.95;
    }
    .item-4 {
      padding-left: 33px;
      opacity: 0.9;
    }
  }
}

// 目录消失
@media (max-width: 1245px) {
  // .remove {
  //   // transform: translateX(-250px);
  // }
}
</style>