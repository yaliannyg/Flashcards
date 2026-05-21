<template>
  <div class="flex size-screen">
    <aside class="w-56">
      <Sidebar />
    </aside>
    <main class="flex-1 flex flex-col h-screen">
      <div class="flex flex-col justify-center border-b border-border h-14">
        <Navbar />
      </div>
      <div
        class="p-1 flex-1 overflow-auto max-h-full bg-surface/30"
        :style="{
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;',
        }"
      >
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
