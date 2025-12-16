<script setup lang="ts">
const props = defineProps<{
  visible?: boolean
}>()

const emit = defineEmits(['update:visible'])
</script>

<template>
  <teleport to="body" v-if="props.visible">
    <div class="overlay">
      <div class="mask"></div>
      <div class="plate">
        <button @click="emit('update:visible', false)">取消</button>
        <slot />
      </div>
    </div>
  </teleport>
</template>

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.plate {
  position: absolute;
  top: 0;
  right: 0;
  width: 600px;
  height: 100%;
  overflow: auto;
  background: #eee;
}
</style>
