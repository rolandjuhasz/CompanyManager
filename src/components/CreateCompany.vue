<script setup>
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { usePostsStore } from '@/stores/companies'; 

const {createPost} = usePostsStore()

const {errors} = storeToRefs(usePostsStore())
const formData = reactive({
  name: "",
  description: "",
});
</script>

<template>
    <form @submit.prevent="createPost(formData)" class="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
  <h2 class="text-2xl font-semibold text-center">Create Your Company</h2>

  <div class="space-y-2">
    <label for="name" class="block text-lg font-medium text-gray-700">Company Name</label>
    <input 
      id="name"
      type="text" 
      placeholder="Enter your company name" 
      v-model="formData.name" 
      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name[0] }}</p>
  </div>

  <div class="space-y-2">
    <label for="description" class="block text-lg font-medium text-gray-700">Company Description</label>
    <textarea
      id="description"
      rows="6"
      placeholder="Enter your company description"
      v-model="formData.description"
      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    ></textarea>
    <p v-if="errors.description" class="text-red-500 text-sm">{{ errors.description[0] }}</p>
  </div>

  <button type="submit" class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all">Create Post</button>
</form>
</template>