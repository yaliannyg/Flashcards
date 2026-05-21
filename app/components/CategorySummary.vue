<template>
  <div class="flex flex-col py-2 border-t border-border">
    <div class="flex flex-col justify-center px-6">
      <span class="font-light text-sm uppercase">Categories</span>
    </div>

    <div class="flex flex-col text-sm py-2 flex-1">
      <template v-if="_data">
        <div
          v-for="{ name, slug, amountCard } in _data"
          class="py-1 px-6 flex"
          :class="{
            'text-on-surface bg-surface font-semibold w-full':
              slug === slugName.value,
          }"
        >
          <NuxtLink :to="`/${slug}`">
            <span class="w-full">{{ name }}</span>
          </NuxtLink>
          <span class="text-xs ml-auto">{{ amountCard }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlug } from "#imports";
import { useCards } from "#imports";
const _useSlug = useSlug();
const { totalAmoundCards } = await useCards();
const { data } = useFetch("/api/categories");

const slugName = computed(() => _useSlug.slugName);

const _data = computed(() => {
  const dataValues = data.value ?? [];

  return [
    { name: "All", slug: "", amountCard: totalAmoundCards.value },
    ...dataValues.map((values) => ({
      ...values,
      amountCard: values.cards?.length,
    })),
  ];
});
</script>
