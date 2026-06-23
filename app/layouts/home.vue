<template>
  <div
    class="flex max-w-7xl size-full h-screen m-auto text-xs overflow-hidden bg-background"
  >
    <Sidebar />

    <main class="flex-1 flex flex-col">
      <div class="flex flex-col sm:flex-row w-full items-baseline sm:items-center px-2 py-4">
        <div
          class="flex items-center justify-center gap-2 text-lg text-text-base font-semibold"
        >
          <h1>Flashcards</h1>
        </div>
        <div class="gap-x-3 ml-auto flex justify-center ">
          <BaseButton label="Add Flash Card" @click="handleAddFlashCard" />
          <button
            type="button"
            class="text-text-heading transition-colors hover:text-text-base"
            aria-label="Account"
            @click="isAuthModalOpen = true"
          >
            <UserCircleIcon class="size-6" />
          </button>
        </div>
      </div>

      <div class="size-full max-h-full flex-1 overflow-auto">
        <slot></slot>
      </div>
    </main>

    <AuthModal :open="isAuthModalOpen" @close="isAuthModalOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { UserCircleIcon } from "@heroicons/vue/24/outline";
import BaseButton from "@/components/UI/BaseButton.vue";
import AuthModal from "@/components/UI/AuthModal.vue";
import Sidebar from "@/components/Sidebar.vue";

const router = useRouter();

const isAuthModalOpen = ref(false);

function handleAddFlashCard() {
  router.push("/add-flashcards");
}
</script>

<style scoped></style>
