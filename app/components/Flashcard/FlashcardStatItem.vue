<template>
  <div class="text-center">
    <div
      class="leading-none mb-0.5 text-base font-bold"
      :class="valueColorClass"
    >
      {{ value }}
    </div>
    <div class="text-xxs font-normal" :class="labelColorClass">
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: number;
  label: string;
  valueColorClass: string;
  labelColorClass: string;
}

defineProps<Props>();
</script>
