<template>
  <span
    className="shrink-0 rounded-full font-medium text-xxs py-0.5 px-2 bg-surface-muted text-text-muted"
  >
    {{ label }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  label: string;
}

defineProps<Props>();
</script>
