<template>
  <aside
    class="flex flex-col items-center justify-between py-3 shrink-0 w-17 bg-[#21213a]"
  >
    <!-- <div class="flex flex-col items-center gap-1.5"> -->
      <FlashcardStatItem
        :value="statSuccess"
        :label="successesLabel"
        value-color-class="text-[#8b5cf6]"
        label-color-class="text-[#6b6b8a]"
      />
      <FlashcardStatItem
        :value="statFailures"
        :label="failuresLabel"
        value-color-class="text-[#e05c78]"
        label-color-class="text-[#6b6b8a]"
      />
    <!-- </div> -->

    <div class="text-center w-full">
      <div class="mb-1 h-px w-full bg-border" />
      <p class="text-sm leading-tight font-bold text-text-muted">
        {{ totalReviews }}
      </p>
      <p class="text-[9px] font-normal text-[#6b6b8a]">{{ totalLabel }}</p>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
import FlashcardStatItem from "./FlashcardStatItem.vue";

interface Props {
  statSuccess: number;
  statFailures: number;
}

const props = defineProps<Props>();

const totalLabel = "total";
const statsLabel = "Review";
const successesLabel = "Successes";
const failuresLabel = "Failures";

const totalReviews = computed(() => props.statSuccess + props.statFailures);
</script>

<style scoped></style>
