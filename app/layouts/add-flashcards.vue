<template>
  <div
    class="flex max-w-7xl size-full h-screen m-auto text-xs overflow-hidden bg-background"
  >
    <Sidebar />

    <main class="flex-1 flex flex-col">
      <div class="size-full max-h-full flex-1 overflow-auto">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
</script>

<style scoped></style>
