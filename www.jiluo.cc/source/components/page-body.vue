<script setup lang="ts"></script>

<template>
  <main :class="$style.wrap">
    <div :class="$style.content">
      <slot />
    </div>
  </main>
</template>

<style module>
.content {
  max-width: 1024px;
  margin: auto;
}
</style>
