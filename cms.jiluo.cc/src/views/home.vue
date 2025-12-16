<script setup lang="ts">
import { useSessionStore } from '@/stores/session'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const session = useSessionStore()

onMounted(async () => {
  if (!session.state.isLoggedIn) {
    const result = await session.checkSession()
    if (!result) {
      // router.replace('/login')
    }
  }
})

const onLogout = async () => {
  await session.logout()
  router.replace('/login')
}
</script>

<template>
  <div class="wrap">
    <div class="side">
      <div class="links">
        <RouterLink to="/list">列表</RouterLink>
      </div>
      <div class="menu">
        <div class="menu_item">首页</div>
        <div class="menu_item">用户中心</div>
        <div class="menu_item">设置</div>
        <div class="menu_item">前台配置</div>
      </div>
      <div>
        <button @click="onLogout">退出登录</button>
      </div>
    </div>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
}
.side {
  width: 300px;
  height: 100%;
  background: lightblue;
  flex: 0 0 auto;
}
</style>
