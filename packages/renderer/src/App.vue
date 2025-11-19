<script setup lang="ts">
import { computed } from "vue";
import { useColorMode } from "@vueuse/core";
import { Sparkles } from '@/components/ui/sparkles'

const particlesColor = computed(() => (useColorMode().value === "dark" ? "#FFFFFF" : "#000000"));
const mode = useColorMode()
mode.value = "dark"
</script>

<template>
  <!-- <HelloWorld msg="Vite + Vue v3.1.4" /> -->
    <div
    class="flex h-[40rem] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-white dark:bg-black"
  >
    
    <div class="relative h-40 w-[40rem]">
      <div
        class="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"
      />
      <div
        class="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
      />
      <div
        class="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm"
      />
      <div
        class="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent"
      />

      <Sparkles
        background="transparent"
        :min-size="0.4"
        :max-size="1.4"
        :particle-density="1200"
        class="size-full"
        :particle-color="particlesColor"
      />

      <div
        class="absolute inset-0 size-full bg-white [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)] dark:bg-black"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
