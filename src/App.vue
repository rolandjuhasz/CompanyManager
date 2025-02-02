<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <header class="bg-gray-800 text-white shadow-lg">
    <nav class="container mx-auto flex justify-between items-center p-4">
      <div class="flex items-center space-x-4">
        <RouterLink
          :to="{ name: 'home' }"
          class="text-lg font-semibold hover:text-blue-400 transition"
        >
          Home
        </RouterLink>
      </div>

      <div v-if="authStore.user" class="flex items-center space-x-6">
        <p class="text-sm text-gray-300">
          Welcome back, <span class="font-bold">{{ authStore.user.name }}</span>
        </p>
        <form @submit.prevent="authStore.logout" class="inline-block">
          <button
            class="text-sm bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Logout
          </button>
        </form>
        <RouterLink
          :to="{ name: 'companies' }"
          class="text-sm bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >My Companies</RouterLink>

        <RouterLink
          :to="{ name: 'profile' }"
          class="text-sm bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >Profile</RouterLink>
      </div>

      <div v-else class="flex items-center space-x-6">
        <RouterLink
          :to="{ name: 'register' }"
          class="text-sm bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Register
        </RouterLink>
        <RouterLink
          :to="{ name: 'login' }"
          class="text-sm bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </RouterLink>
      </div>
    </nav>
  </header>
  <RouterView />
</template>
