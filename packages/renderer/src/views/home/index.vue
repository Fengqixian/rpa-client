<script setup lang="ts">
import { computed } from "vue";
import { useColorMode } from "@vueuse/core";
import { Sparkles } from '@/components/ui/sparkles'

const particlesColor = computed(() => (useColorMode().value === "dark" ? "#FFFFFF" : "#000000"));
const mode = useColorMode()
mode.value = "dark"
</script>

<template>
    <!-- 真正的全屏容器（关键！） -->
    <div class="fixed inset-0 grid grid-rows-[auto_1fr_auto]">
        <!-- 上部：三等分，可固定高度或内容撑开 -->
        <header class="grid grid-cols-3 p-16">
            <div class="col-span-1">
                <!-- 左侧内容 -->
                <div class="flex items-center space-x-2">
                    <span class="flex size-2 rounded-full bg-green-500"></span>
                    <span>连接成功</span>
                </div>
            </div>
            <div class="col-span-1 text-center">
                <!-- 中间内容 -->
            </div>
            <div class="col-span-1 text-right">
                <!-- 右侧内容 -->
            </div>

        </header>

        <!-- 中部：占满剩余全部空间，可滚动 -->
        <main class="overflow-y-auto from-gray-950 to-gray-100">
            <div class="p-36">
                <div
                    class="flex h-[35rem] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-white dark:bg-black">
                    <div class="relative h-40 w-[35rem]">
                        <div
                            class="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
                        <div
                            class="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
                        <div
                            class="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
                        <div
                            class="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

                        <Sparkles background="transparent" :min-size="0.4" :max-size="1.4" :particle-density="1200"
                            class="size-full" :particle-color="particlesColor" />

                        <div
                            class="absolute inset-0 size-full bg-white [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)] dark:bg-black">
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- 底部：固定在屏幕底部 -->
        <footer class="bg-gradient-to-b">
            
        </footer>

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
