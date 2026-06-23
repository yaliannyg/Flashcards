<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      @click.self="emit('close')"
    >
      <div
        class="flex w-full max-w-xs flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-2xl"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-semibold text-text-base">
            {{ isAuthenticated ? SIGNED_IN_TITLE : TITLE }}
          </h2>
          <button
            type="button"
            class="text-text-heading transition-colors hover:text-text-base"
            aria-label="Close"
            @click="emit('close')"
          >
            <XMarkIcon class="size-5" />
          </button>
        </div>

        <!-- Signed in: flashcards persist to the database. -->
        <div v-if="isAuthenticated" class="flex flex-col gap-3">
          <p class="text-[13px] text-text-heading">{{ SIGNED_IN_MESSAGE }}</p>
          <button
            type="button"
            class="rounded-lg border border-border px-4 py-2 font-semibold text-text-base transition-colors hover:bg-surface-muted"
            @click="handleLogout"
          >
            {{ LOGOUT_LABEL }}
          </button>
        </div>

        <!-- Signed out: flashcards persist to localStorage. -->
        <form v-else class="flex flex-col gap-3" @submit.prevent="handleSubmit">
          <div class="flex flex-col gap-1.5">
            <label
              for="auth-email"
              class="text-xxs font-semibold tracking-[0.18em] text-text-heading uppercase"
            >
              {{ EMAIL_LABEL }}
            </label>
            <input
              id="auth-email"
              v-model="email"
              type="email"
              :placeholder="EMAIL_PLACEHOLDER"
              class="rounded-lg border border-border bg-surface-muted px-3 py-2 text-[13px] text-text-base placeholder:text-text-heading outline-none focus:border-primary-emphasis"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label
              for="auth-password"
              class="text-xxs font-semibold tracking-[0.18em] text-text-heading uppercase"
            >
              {{ PASSWORD_LABEL }}
            </label>
            <input
              id="auth-password"
              v-model="password"
              type="password"
              :placeholder="PASSWORD_PLACEHOLDER"
              class="rounded-lg border border-border bg-surface-muted px-3 py-2 text-[13px] text-text-base placeholder:text-text-heading outline-none focus:border-primary-emphasis"
            />
          </div>

          <p v-if="error" class="text-xxs font-medium text-red-500">
            {{ error }}
          </p>

          <button
            type="submit"
            class="mt-1 rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-80"
          >
            {{ SUBMIT_LABEL }}
          </button>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { useAuth } from "~/composables/useAuth";

const TITLE = "Sign in";
const SIGNED_IN_TITLE = "Account";
const SIGNED_IN_MESSAGE = "You're signed in. Flashcards are saved to your account.";
const EMAIL_LABEL = "Email";
const EMAIL_PLACEHOLDER = "you@example.com";
const PASSWORD_LABEL = "Password";
const PASSWORD_PLACEHOLDER = "••••••••";
const SUBMIT_LABEL = "Submit";
const LOGOUT_LABEL = "Sign out";
const INVALID_MESSAGE = "Invalid email or password";

interface Props {
  open: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const { isAuthenticated, login, logout } = useAuth();

const email = ref("");
const password = ref("");
const error = ref("");

async function handleSubmit() {
  error.value = "";
  const success = await login(email.value, password.value);

  if (success) {
    // The study store reloads from the database via the auth watcher.
    email.value = "";
    password.value = "";
    emit("close");
  } else {
    error.value = INVALID_MESSAGE;
  }
}

function handleLogout() {
  logout();
  emit("close");
}
</script>

<style scoped></style>
