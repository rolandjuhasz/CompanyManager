<script setup>
import { ref, onMounted } from 'vue';
import { useCompanyStore } from '@/stores/companies';
import { useAuthStore } from '@/stores/auth';

const {deleteCompany} = useCompanyStore()
const companyStore = useCompanyStore();
const authStore = useAuthStore();
const companies = ref([]);

onMounted(async () => {
  const allCompany = await companyStore.getAllCompany(); 
  companies.value = allCompany.filter(company => company.user_id === authStore.user.id);
});

</script>

<template>
    <div v-for="company in companies" :key="company.id" class="company-card">
     <form @submit.prevent="deleteCompany(company)">
            <button
              class="text-red-500 font-bold px-2 py-1 border border-red-300">
              Delete
            </button>
          </form>
          </div>
</template>