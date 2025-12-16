<script setup lang="ts">
const navigations = [
  {
    key: "index",
    path: "/",
    text: "首页",
  },
  // {
  //   key: "articles",
  //   path: "/articles",
  //   text: "文章",
  // },
  // {
  //   key: "concat",
  //   path: "/concat",
  //   text: "联系",
  // },
  // {
  //   key: "about",
  //   path: "/about",
  //   text: "关于",
  // },
];

const isLogin = false;
</script>

<template>
  <div :class="$style.wrap">
    <div :class="$style.header_content">
      <NuxtLink :class="$style.logo_link" to="/">
        <img
          :class="$style.logo"
          src="https://dummyimage.com/120x60/fff/ec6fb4&text=jiluo.cc"
          alt=""
        />
      </NuxtLink>
      <ul :class="$style.navigations">
        <li :class="$style.navigation" v-for="i in navigations">
          <NuxtLink :class="$style.navigation_link" :to="i.path">
            {{ i.text }}
          </NuxtLink>
        </li>
      </ul>
      <div :class="$style.actions" hidden>
        <template v-if="isLogin">
          <img
            :class="$style.avatar"
            src="https://dummyimage.com/50x50/f60/fff"
            alt=""
            role="button"
          />
        </template>
        <template v-else>
          <div>登录</div>
          <div>注册</div>
        </template>
      </div>
    </div>
  </div>
</template>

<!-- <i18n>
  {
  "en": {
    "hello": "hello world!"
  },
  "ja": {
    "hello": "こんにちは、世界！"
  }
}
</i18n> -->

<style module>
.wrap {
  position: sticky;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: #fffe;
  backdrop-filter: blur(4px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.04);
}

.header_content {
  display: flex;
  align-items: stretch;
  gap: 20px;
  max-width: 1024px;
  height: 100%;
  margin: auto;
  /* background: var(--color_1); */
}
.logo {
  display: block;
  height: 100%;
  width: auto;
}
.navigations {
  height: 100%;
  display: flex;
  align-items: stretch;
  margin: 0 auto 0 0;
}
.navigation {
  height: inherit;
}
.navigation_link {
  position: relative;
  display: flex;
  height: inherit;
  align-items: center;
  padding: 0 40px;
  font-size: 20px;
}

.navigation_link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom: 3px solid #ec6fb4;
  scale: 0;
  transition: scale 0.3s;
}
.navigations:hover :global(.router-link-active)::after {
  scale: 0;
}
.navigations .navigation_link:hover::after,
.navigation_link:global(.router-link-active)::after {
  scale: 1;
}
.navigations:hover :global(.router-link-active) {
  color: unset;
  font-weight: unset;
}
.navigation_link:global(.router-link-active),
.navigations .navigation_link:hover {
  font-weight: 500;
  color: #ec6fb4;
}

.actions {
  align-self: center;
}
.avatar {
  width: 46px;
  height: 46px;
  border-radius: 100%;
}
</style>
