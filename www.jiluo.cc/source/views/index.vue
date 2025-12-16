<script setup lang="ts">
// 首页放置一些 个人信息 或者一些 动态 或者一些与自己相关的动态 或者一些推荐内容
// import { articles } from "@/services";

const result = await useFetch<any>("https://api.jiluo.cc/articles");
console.log(result.data);
const articles = result.data;
</script>

<template>
  <div :class="$style.wrap">
    <div class="side">
      <img
        src="https://s2.loli.net/2023/04/22/VzNw4aZvoUyGWMI.jpg"
        alt=""
        class="avatar"
      />
      <div class="name">章生</div>
    </div>
    <div class="content">
      <div class="articles">
        <NuxtLink
          v-for="i in articles"
          :to="`/articles/${i.id}`"
          class="article"
        >
          <img :src="i.cover" alt="" class="article_image" />
          <div>
            <div class="article_title">{{ i.title }}</div>
            <div class="article_brief">
              {{ i.summary }}
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.side {
  width: 200px;
  background: #fff;
  align-self: flex-start;
  position: sticky;
  top: 80px;
  padding: 20px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.04);
  margin: 20px 20px 0 0;
  flex: 0 0 auto;
}
.avatar {
  display: block;
  margin: auto;
  width: 80px;
  height: 80px;
  border-radius: 100%;
}
.name {
  font-size: 24px;
  line-height: 1;
  text-align: center;
  padding: 20px 0;
}
.content {
  padding: 20px;
}

.article {
  display: flex;
  gap: 20px;
  margin: 0 0 20px;
}
.article_image {
  width: 192px;
  height: 108px;
  border-radius: 5px;
  border: none;
  flex: 0 0 auto;
  object-position: top;
  object-fit: cover;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
}
.article_title {
  font-size: 20px;
  font-weight: 500;
  line-height: 1;
  margin: 0 0 10px;
}
.article_brief {
  font-size: 16px;
  line-height: 1.4;
  max-height: 16px * 1.4 * 3;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>

<style module>
.wrap {
  display: flex;
}
</style>
