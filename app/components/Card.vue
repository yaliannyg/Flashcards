<template>
  <div
    class="border border-border bg-white size-full rounded-2xl flex flex-col text-sm relative overflow-hidden"
    :class="{
      'bg-muted!': !isFront,
    }"
    :style="{
      boxShadow:
        'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;',
    }"
  >
    <div class="absolute top-0 right-4">
      <span class="text-[10px] font-medium uppercase text-on-surface">{{
        buttonName
      }}</span>
    </div>
    <div
      class="overflow-hidden text-sm flex-1 flex justify-center items-center px-2 text-center w-full"
    >
      <span v-if="isFront" class="line-clamp-2">{{ front }}</span>
      <span v-else class="line-clamp-2">{{ back }}</span>
    </div>

    <BaseButton @click="isFront = !isFront" class="border-t border-surface">
      <span v-if="isFront"> Reveal answer </span>
      <span v-else> Hide answer </span>
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "./UI/BaseButton.vue";
import type { CardDTO } from "~~/shared/types/cards.types";
import { ref } from "vue";
defineProps<CardDTO>();
const isFront = ref(true);

const buttonName = computed(() => {
  return isFront.value ? "Front" : "Back";
});
</script>

<style scoped></style>
