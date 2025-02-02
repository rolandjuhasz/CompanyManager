<script setup>
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
</script>
<template>
    <main class="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 py-12">
      <section class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="relative">
          <!-- Profil háttérkép -->
          <div class="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>
          <!-- Profil kép -->
          <div class="absolute -bottom-16 left-8">
            <img
              :src="authStore.user.profileImage"
              alt="Profil kép"
              class="w-32 h-32 rounded-full border-4 border-white"
            />
          </div>
        </div>
  
        <div class="px-8 pt-20 pb-8">
          <!-- Név és helyszín -->
          <h1 class="text-3xl font-bold text-gray-900">{{ authStore.user.name }}</h1>
          <p class="text-gray-600">{{ authStore.user.location }}</p>
  
          <!-- Bio -->
          <p class="mt-4 text-gray-700">{{ authStore.user.bio }}</p>
  
          <!-- Szerkesztés gomb -->
          <router-link
            to="/profile/edit"
            class="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Profil szerkesztése
          </router-link>
        </div>
      </section>
    </main>
  </template>
  