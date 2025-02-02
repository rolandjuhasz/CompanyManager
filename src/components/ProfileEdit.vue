<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();

// Szerkesztésre váró adatok
const editData = ref({
  name: authStore.user.name,
  email: authStore.user.email,
  bio: authStore.user.bio,
  location: authStore.user.location,
});

// Szerkesztés mentése
const saveProfile = async () => {
  const result = await authStore.updateProfile(editData.value);
  if (result.success) {
    alert(result.message);
  } else {
    alert(result.message);
  }
};
</script>

<template>
  <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-6">Profil szerkesztése</h2>
    <form @submit.prevent="saveProfile">
      <div class="mb-4">
        <label class="block text-gray-700">Név</label>
        <input
          v-model="editData.name"
          type="text"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Email</label>
        <input
          v-model="editData.email"
          type="email"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Bio</label>
        <textarea
          v-model="editData.bio"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Helyszín</label>
        <input
          v-model="editData.location"
          type="text"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Mentés
      </button>
    </form>
  </div>
</template>