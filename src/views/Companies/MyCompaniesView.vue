<script setup>
import { ref, onMounted } from 'vue';
import { useCompanyStore } from '@/stores/companies';
import { useAuthStore } from '@/stores/auth';
import DeleteCompany from '@/components/DeleteCompany.vue';


const companyStore = useCompanyStore();
const authStore = useAuthStore();
const companies = ref([]);


onMounted(async () => {
  const allCompany = await companyStore.getAllCompany(); 
  companies.value = allCompany.filter(company => company.user_id === authStore.user.id);
});

</script>

<template>
  <main>
    <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-black text-center py-6">
  My Companies
</h1>



<div v-if="companies.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <div 
    v-for="company in companies" 
    :key="company.id" 
    class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
  >
    <h2 class="font-bold text-xl text-gray-800 mb-2">{{ company.name }}</h2>
    <p class="text-gray-600 mb-4">{{ company.description }}</p>
    <DeleteCompany />
    <RouterLink
  :to="{ name: 'show', params: { id: company.id } }" 
  class="text-blue-500 font-bold underline"
>
  Read more...
</RouterLink>
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


