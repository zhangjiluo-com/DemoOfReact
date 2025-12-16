<script setup lang="ts">
import ArticleEditForm from '@/components/article-edit-form.vue'
import Overlay from '@/components/overlay.vue'
import { getArticleAll, removeArticle } from '@/services'
import { onMounted, reactive } from 'vue'

const state = reactive({
  editItem: null as unknown,
  editVisible: false,
  list: [] as any[]
})

const getList = async () => {
  const list = await getArticleAll()

  state.list = list
}

onMounted(async () => {
  getList()
})

const onEdit = (item: unknown) => {
  state.editItem = item
  state.editVisible = true
}

const onRemove = async (id: string) => {
  const res = confirm('删除？')
  if (!res) {
    return
  }
  await removeArticle(id)
  alert('成功')
  getList()
}

const onHide = () => {
  state.editItem = null
  state.editVisible = false
}

const onOver = () => {
  getList()
  onHide()
}

const onAdd = () => {
  state.editVisible = true
}
</script>

<template>
  <div class="wrap">
    <div>
      <button @click="onAdd()">添加</button>
    </div>
    <div v-for="i in state.list" :key="i.id" class="row">
      <div>
        {{ i.id }}
      </div>
      <div>
        <RouterLink :to="`/articles/${i.id}`">
          {{ i.title }}
        </RouterLink>
      </div>
      <div>{{ i.createdAt }}</div>
      <div>{{ i.updatedAt }}</div>
      <div><button @click="onEdit(i)">编辑</button></div>
      <div><button @click="onRemove(i.id)">删除</button></div>
    </div>
  </div>
  <Overlay :visible="state.editVisible" @update:visible="onHide">
    <ArticleEditForm :item="(state.editItem as any)" @over="onOver" />
  </Overlay>
</template>

<style>
.wrap {
}
.row {
  display: flex;
  gap: 24px;
  margin: 16px;
  border-bottom: 1px solid #ccc;
}
</style>
