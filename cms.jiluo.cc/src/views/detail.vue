<script setup lang="ts">
import { getArticle } from '@/services'
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const state = reactive({
  data: {
    title: '',
    createAt: '',
    cover: '',
    summary: '',
    content: ''
  }
})

const getDetail = async () => {
  const data = await getArticle(route.params.id as string)
  state.data = data
}

onMounted(() => {
  getDetail()
})
</script>

<template>
  <div class="wrap">
    <div>详情：</div>
    <div class="title">{{ state.data.title }}</div>
    <div class="date">{{ state.data.createAt }}</div>
    <div>
      <img :src="state.data.cover" alt="" />
    </div>
    <div class="summary">{{ state.data.summary }}</div>
    <div class="content" v-html="state.data.content"></div>
  </div>
</template>
