<script setup>
import { ref, onMounted } from 'vue';
import { usePostsStore } from '@/stores/companies'; // a Pinia store
import { useAuthStore } from '@/stores/auth'; // a bejelentkezett felhasználó adatai

// Store-ok importálása
const postsStore = usePostsStore();
const authStore = useAuthStore();
const companies = ref([]);

const {deleteCompany} = usePostsStore()

// Cég adatainak lekérése
onMounted(async () => {
  const allPosts = await postsStore.getAllPosts(); // Lekérjük a cégeket
  // Csak a bejelentkezett felhasználóhoz tartozó cégeket szűrjük
  companies.value = allPosts.filter(post => post.user_id === authStore.user.id);
});

</script>

<template>
  <main>
    <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-black text-center py-6">
  My Companies
</h1>



    <div v-if="companies.length > 0">
      <div v-for="company in companies" :key="company.id" class="company-card">
        <h2 class="font-bold text-xl">{{ company.name }}</h2>
        <p>{{ company.description }}</p>
        <!-- Link a cég részleteihez -->
        <form @submit.prevent="deleteCompany(company)">
            <button
              class="text-red-500 font-bold px-2 py-1 border border-red-300"
            >
              Delete
            </button>
          </form>
      </div>
    </div>

    <div v-else>
    <p class="text-1xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-black text-center py-6">You don't have a company yet</p>
</div>

<div class="text-center">
<RouterLink 
  :to="{ name: 'create' }" 
  class="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg text-center hover:bg-blue-700 transition duration-300">Create Company</RouterLink>

    </div>

  </main>
</template>

<style scoped>
.company-card {
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.company-card h2 {
  margin-bottom: 8px;
}

.company-card p {
  font-size: 14px;
  color: #555;
}

.text-blue-500 {
  color: #3b82f6;
  text-decoration: underline;
}
</style>
