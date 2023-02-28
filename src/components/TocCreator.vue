<script lang="ts" setup>
import { inject, onMounted, Ref, ref, watch } from "vue";
import { searchInsert, draggable, throttle } from "../utils";

interface Props {
  // 提供属性 - css选择器 限制标题元素检测范围
  container?: string;
  // 滚动检测源 - 响应式数据
  scrollTop?: Ref<number>;
}
const props = withDefaults(defineProps<Props>(), {
  container: "",
});

// toc组件 - 标题元素集合
const headElems = ref<NodeListOf<HTMLElement> | any>();

// 获取文档滚动实时高度
let scrollTop = ref(0);

// 不可用原生 window api 可传入一个响应式对象
if (props.scrollTop) {
  scrollTop.value = props.scrollTop.value;
} else {
  // 监听浏览器滚动事件
  window.addEventListener("scroll", function () {
    scrollTop.value = window.pageYOffset;
  });
}

// 不可用原生 window api 可使用 inject 获取
// scrollTop = inject("scrollTop") as Ref<number>;

// toc操作都得等dom渲染完
onMounted(() => {
  // 获取拖拽dom，使其可拖拽
  const dragBar = document.getElementsByClassName("dragBar")[0] as HTMLElement;
  const toc = document.getElementsByClassName("toc")[0] as HTMLElement;
  draggable(dragBar, toc);

  // querySelectorAll返回的NodeList是类数组，不具有某些数组方法如 map，为了非要用map我转成数组
  headElems.value = Array.from(
    document.querySelectorAll(`${props.container} h2,h3,h4,h5,h6`)
  );

  // 获取标签元素相对文档的高度
  function getHeadElemHeightArr(headElems: HTMLElement[]): number[] {
    return headElems.map(
      (ele: HTMLElement, index: number) =>
        ele.getBoundingClientRect().top + window.pageYOffset
    );
  }

  let HeadElemHeightArr = getHeadElemHeightArr(headElems.value);

  // 上一个被点亮的toc
  let lastIndex: number;

  // 监听加节流
  // 但是 监测点计算不能节流
  const scrollHandler = throttle((newVal: number, point: number) => {
    // 因为文档的图片随时加载导致标题元素高度变化，所以刷新下高度数组
    HeadElemHeightArr = getHeadElemHeightArr(headElems.value);

    // 包含监测点的标题序号
    const curIndex = searchInsert(HeadElemHeightArr, point);

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
  }, 100);

  watch(scrollTop, (newVal: number) => {
    // watch的回调参数会自动解包
    // 滚动高度 + 视口高度/2 = 监测点
    const point = newVal + window.innerHeight / 2;

    scrollHandler(newVal, point);
  });
});

// 目录收起和放下
const isCollapse = ref(false);
</script>

<template>
  <!-- toc组件 -->
  <div class="toc remove">
    <button class="dragBar">
      =
      <button
        @click="isCollapse = !isCollapse"
        :class="[isCollapse ? 'collapse' : 'expand']"
      >
        {{ isCollapse ? "&#8892;" : "&#8893;" }}
      </button>
    </button>
    <ul v-show="!isCollapse">
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
* {
  padding: 0;
  margin: 0;
}
.toc {
  width: 200px;
  position: fixed;
  z-index: 1;
  // 提升拖拽移动速度
  transition: all 0.2s ease;
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
    border-radius: 0 10px 0 10px;
    transform: translateY(20px);
    background-color: #476582;

    &:hover {
      transform: translateY(15px);
      box-shadow: 0px 2px 30px rgba(128, 128, 128, 0.455);
      & + ul {
        // box-shadow: none;
        transform: translateY(10px);
      }
    }

    // 避免鼠标滑出后样式变化，增加渲染成本
    &:active {
      transform: translateY(15px);

      & + ul {
        box-shadow: none;
        transform: translateY(10px);
      }
    }

    // 折叠button
    button {
      position: absolute;
      width: 25px;
      top: 50%;
      transform: translateY(-50%);
      right: 10px;
      background-color: #476582;
      border: none;
      font-weight: bold;
      font-size: 18px;
      transition: all 0.3s ease;

      &:hover {
        color: white;
      }

      &.collapse {
        content: "\22BC";
      }
      &.expand {
        content: "\22BD";
      }
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
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      background: transparent;
      transition: all 0.5s ease;
      padding: 2px 0px;
      border-left: 3px solid transparent;
      transform: translateX(-3px);
      border-radius: 0 3px 3px 0;

      &:hover {
        background-color: #ffebeb;
        border-left: 3px solid #cf5659;
      }
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
    .item-5 {
      padding-left: 38px;
      opacity: 0.9;
    }
    .item-6 {
      padding-left: 43px;
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
