<template>
  <div class="flex px-4 justify-center items-center">
    <span class="text-sm font-semibold capitalize">{{ slug.slugName }}</span>

    <div class="flex flex-1 gap-2 justify-end">
      <div class="w-fit">
        <BaseButton> + Add Category</BaseButton>
      </div>
      <div class="w-fit">
        <BaseButton> + Add Flash Card</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "./UI/BaseButton.vue";
import { useSlug } from "~/composables/useSlug";
const slug = useSlug();
</script>

<style scoped></style>
