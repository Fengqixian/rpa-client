<script setup lang="ts">

</script>

<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <Transition
      name="fade"
      mode="out-in"
      appear>           <!-- 首次加载也触发动画 -->
      
      <component :is="Component" :key="route.fullPath" />
      
    </Transition>
    </router-view>
  </div>
</template>
<style scoped>
/* 淡入淡出核心 CSS（推荐写在全局样式里，比如 src/assets/css/transition.css） */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 可选：首次进入也加一点轻微位移，更高级感 */
.fade-enter-active {
  transition: opacity 1.5s ease, transform 1.5s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
</style>