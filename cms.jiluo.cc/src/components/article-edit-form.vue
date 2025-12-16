<script setup lang="ts">
import { reactive } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { addArticle, updateArticle } from '@/services'
import WelcomeItem from './WelcomeItem.vue'

const props = defineProps<{
  item?: {
    id: number
    title: string
    cover: string
    summary: string
    content: string
  }
}>()

const emit = defineEmits(['over'])

const state = reactive({
  form: {
    title: props.item?.title,
    cover: props.item?.cover,
    summary: props.item?.summary,
    content: props.item?.content
  }
})

const derivate = {
  isEdit: !!props.item
}

const onReset = () => {
  state.form = {
    title: props.item?.title,
    cover: props.item?.cover,
    summary: props.item?.summary,
    content: props.item?.content
  }
}

const onSubmit = async () => {
  if (derivate.isEdit) {
    await updateArticle(props.item!.id, state.form)
  } else {
    await addArticle(state.form)
  }
  alert('成功')
  emit('over')
}
</script>

<template>
  <div class="form">
    <div>
      <span v-if="derivate.isEdit">编辑</span>
      <span v-else>创建</span>
    </div>
    <div class="form_item">
      标题：
      <input type="text" v-model="state.form.title" />
    </div>
    <div class="form_item">
      封面：
      <input type="text" v-model="state.form.cover" />
    </div>
    <div class="form_item">
      <img :src="state.form.cover" alt="" />
    </div>
    <div class="form_item">
      简介：
      <textarea v-model="state.form.summary" cols="30" rows="10"></textarea>
    </div>
    <div class="form_item">
      内容：
      <div style="padding-bottom: 30px; display: flex; flex-flow: column">
        <QuillEditor
          theme="snow"
          toolbar="full"
          contentType="html"
          v-model:content="state.form.content"
        />
      </div>
    </div>

    <div class="buttons">
      <button @click="onReset">重置</button>
      <button @click="onSubmit">保存</button>
    </div>
  </div>
</template>

<style>
.form {
  padding: 24px;
  width: 500px;
  font-size: 18px;
  line-height: 1.25;
}
.form_item {
  margin: 16px;
  display: flex;
  gap: 24px;
}
.form_item input,
.form_item textarea {
  flex: 1;
  font-size: 18px;
  line-height: 1.25;
}
.buttons {
  display: flex;
  gap: 24px;
  justify-content: center;
}
.buttons button {
  font-size: 20px;
}
</style>
