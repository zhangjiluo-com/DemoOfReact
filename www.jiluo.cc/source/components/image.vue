<script setup lang="ts">
type Props = {
  url?: string;
};
const props = defineProps<Props>();
</script>

<template>
  <img :class="$style.wrap" :src="props.url" alt="" />
</template>

<style module>
.wrap {
}
</style>
