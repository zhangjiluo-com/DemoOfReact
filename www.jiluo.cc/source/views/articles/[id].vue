<script setup lang="ts">
// 首页放置一些 个人信息 或者一些 动态 或者一些与自己相关的动态 或者一些推荐内容
const route = useRoute();

const result = await useFetch<any>(
  `https://api.jiluo.cc/articles/${route.params.id}`
);

const article = result.data;

if (!article) {
  navigateTo("/404");
}
</script>

<template>
  <div :class="$style.wrap">
    <h1 :class="$style.title">{{ article.title }}</h1>
    <div :class="$style.create_at">{{ article.createdAt }}</div>
    <div :class="$style.content" v-html="article.content"></div>
  </div>
</template>

<style module lang="postcss">
.title {
  text-align: center;
}
.create_at {
  text-align: center;
  color: #999;
}
.content {
  line-height: 1.5;
  & img {
    width: 100%;
    display: block;
  }
}
</style>
