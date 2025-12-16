<script setup lang="ts">
import { useSessionStore } from '@/stores/session'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const session = useSessionStore()
const router = useRouter()
const data = reactive({
  form: {
    username: '',
    password: ''
  }
})

const onSubmit = async () => {
  await session.login(data.form)

  router.push('/')
}
</script>

<template>
  <div class="wrap">
    <div class="bg"></div>
    <div class="form">
      <div class="form_content">
        <div class="form_item">
          <div class="form_item_label">账号</div>
          <input v-model="data.form.username" type="text" class="input" />
        </div>
        <div class="form_item">
          <div class="form_item_label">密码</div>
          <input v-model="data.form.password" type="password" class="input" />
        </div>
        <div class="form_item">
          <div class="button" @click="onSubmit">登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
}
.form {
  position: absolute;
  top: 0;
  right: 0;
  width: 600px;
  height: 100%;
  display: flex;
  align-items: center;
}
.form_content {
  width: 100%;
  padding: 60px 0;
}
.form_item {
  width: 400px;
  display: flex;
  align-items: center;
  margin: 24px auto;
  gap: 24px;
}
.form_item_label {
  font-size: 20px;
}
.input {
  flex: 1;
  font-size: 20px;
  background: none;
  border: 0;
  outline: 0;
  border-bottom: 1px solid #999;
}
.button {
  width: 100%;
  height: 40px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  background: #333;
  color: #fff;
  border-radius: 2px;
}
</style>
