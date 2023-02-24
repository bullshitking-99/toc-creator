<script lang="ts" setup>
import { html as post } from "./post/InkBlogger.md";
import TocCreator from "./components/TocCreator.vue";
</script>

<template>
  <main>
    <TocCreator></TocCreator>
    <article class="vuepress-markdown-body" v-highlight v-html="post"></article>
  </main>
</template>

<style scoped lang="scss">
main {
  width: 60vw;
  max-width: 845px;

  padding: 20px;
  background-color: bisque;
  margin: 5vh auto;
  border-radius: 10px;
  box-shadow: 0px 2px 30px rgba(128, 128, 128, 0.455);
}
article {
  max-width: 805px;

  border-radius: 10px;
}

@media (max-width: 800px) {
  main {
    padding: 0;
    margin: 5px auto;
    min-width: 380px;
  }
}
</style>
