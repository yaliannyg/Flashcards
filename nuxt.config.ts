import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["./app/assets/css/main.css"],
  nitro: {
    preset: "netlify",
  },
  modules: ["nuxt-mongoose"],
  runtimeConfig: {
    // Owner credentials checked server-side on sign in. Never exposed to the client.
    authEmail: process.env.AUTH_EMAIL,
    authPassword: process.env.AUTH_PASSWORD,
  },
});
