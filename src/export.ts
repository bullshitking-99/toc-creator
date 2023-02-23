import type { App } from "vue";
import TocCreator from "./components/TocCreator.vue";

export { TocCreator };

// 全局引入
export default {
  install: (app: App): void => {
    app.component("TocCreator", TocCreator);
  },
};
