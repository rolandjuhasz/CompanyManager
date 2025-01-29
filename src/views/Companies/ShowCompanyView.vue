<script setup>
import { useAuthStore } from "@/stores/auth";
import { useCompanyStore } from "@/stores/companies";
import { onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import EmployeView from "../Employees/EmployeView.vue";

const route = useRoute();
const { getCompany, deleteCompany } = useCompanyStore();
const authStore = useAuthStore();
const company = ref(null);

onMounted(async () => (company.value = await getCompany(route.params.id)));
</script>

<template>
  <main>
    <div v-if="company" class="text-center">
      <div class="border-l-4 mt-12 border-red-800">
        <h2 class="font-bold text-3xl">{{ company.name }}</h2>
        <p class="text-xs text-slate-600 mb-4">
          Owner is  
          <span class="text-red-800 font-bold">{{ company.user.name }} </span> 
          <br>

        </p>
        <p>
          {{ company.description }}
          <EmployeView />
        </p>


        <div
          v-if="authStore.user && authStore.user.id === company.user_id"
          class="flex items-center gap-6 mt-6">

        </div>
      </div>
    </div>
    <div v-else>
      <h2 class="title text-2xl text-center">You don't have company with this ID.</h2>
    </div>
  </main>
</template>