/**
 * 二分查找，没找到就返回插入位置左侧的索引
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
export function searchInsert(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return right;
}

/**
 * 节流
 * @param func
 * @param delay
 * @returns
 */
function throttle(func: Function, delay: number) {
  //   设置静默状态，在每次执行后进入静默并记录调用参数与上下文，解除静默后立即执行一次最终调用
  let isThrottle = false;
  let lastArgs: any[];
  let lastThis: Object;

  return function wrapper(this: Object, ...args: any[]) {
    //静默状态下记录调用的参数与上下文，以便之后调用
    if (isThrottle) {
      lastArgs = args;
      lastThis = this;
      // 记得退出
      return;
    }

    // 进入静默状态，执行一次函数
    isThrottle = true;
    // 注意这里调用的不是lastArgs，因其保存的是静默时期的调用信息
    func.apply(this, args);

    // 计时退出静默状态，执行期间最后一次调用
    // 内部运行的不是 func，而是 wrapper，因为我们不仅需要执行 func
    // 还需要再次进入冷却状态并设置 timeout 以重置它。
    setTimeout(() => {
      isThrottle = false;
      if (lastArgs.length) {
        wrapper.apply(lastThis, lastArgs);
        // 调用信息清零以防止无限调用
        lastArgs = [];
        lastThis = {};
      }
    }, delay);
  };
}

/**
 * 将元素变得可拖拽
 * @param dragDom 拖拽抓手
 * @param moveDom 随拖拽移动物，不传默认为 dragDom
 */
export function draggable(dragDom: HTMLElement, moveDom = dragDom): void {
  // 拖拽进行标记
  let isDraging = false;

  // 整个生命周期的移动距离
  let moveX: number = 0;
  let moveY: number = 0;

  // 单次拖拽鼠标初始坐标
  let initialMouseX: number;
  let initialMouseY: number;

  // 鼠标按下时记录按下点相对拖拽物体的坐标
  dragDom.onpointerdown = (e: MouseEvent) => {
    initialMouseX = e.pageX;
    initialMouseY = e.pageY;

    isDraging = true;
  };

  // 鼠标移动时实时移动元素
  // 节流处理
  const func = throttle(function (e: MouseEvent) {
    if (isDraging) {
      // 随鼠标移动获取元素位移距离
      let mouseMoveX = e.pageX - initialMouseX;
      let mouseMoveY = e.pageY - initialMouseY;

      // 根据上一次拖拽终点位置来位移
      moveDom.style.transform = `translate3d(${moveX + mouseMoveX}px,${
        moveY + mouseMoveY
      }px,0)`;
    }
  }, 100);
  document.onpointermove = func;

  // 鼠标松开时停止拖拽
  // 事件会冒泡到父元素，所以把事件监听器绑在父元素，性能更好。这种方式叫做事件代理。
  document.onpointerup = (e: MouseEvent) => {
    // 最后一公里
    if (isDraging) {
      // 拖拽结束时鼠标在元素外
      // 在mouseup时记录最终位置，并记录最终位置，transform过去
      moveX += e.pageX - initialMouseX;
      moveY += e.pageY - initialMouseY;

      moveDom.style.transform = `translate3d(${moveX}px,${moveY}px,0)`;
    }
    isDraging = false;
  };
}
