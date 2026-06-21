<template>
  <div class="flex flex-col gap-2 rounded-2xl bg-surface p-4 shadow-2xl">
    <label
      :for="id"
      class="text-xxs font-semibold tracking-[0.18em] text-text-heading uppercase"
    >
      {{ label }}
    </label>
    <textarea
      :id="id"
      v-model="model"
      :placeholder="placeholder"
      class="flex-1 resize-none bg-transparent text-[13px] leading-relaxed font-normal text-text-base placeholder:text-text-heading outline-none"
    />
    <p v-if="error" class="text-xxs font-medium text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string;
  label: string;
  placeholder: string;
  error?: string;
}

defineProps<Props>();

const model = defineModel<string>({ default: "" });
</script>
