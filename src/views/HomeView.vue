<script setup>
import { ref } from "vue";

const steps = ref([
  {
    step: "Step 1",
    title: "Dream Big",
    description: "Visualize your business idea and set ambitious goals.",
    icon: "🌟",
  },
  {
    step: "Step 2",
    title: "Build Your Company",
    description: "Register your company and start shaping your vision.",
    icon: "🏢",
  },
  {
    step: "Step 3",
    title: "Hire the Best Talent",
    description: "Assemble a team of passionate individuals who share your vision.",
    icon: "💼",
  },
  {
    step: "Step 4",
    title: "Achieve Greatness",
    description: "Scale your business and create a lasting impact.",
    icon: "🚀",
  },
]);
</script>

<template>
  <main class="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800">
    <section class="relative text-center py-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-b-lg shadow-md">
      <div class="absolute inset-0 bg-blue-700 opacity-50"></div>
      <div class="relative z-10">
        <h1 class="text-6xl font-bold mb-6 tracking-tight">
          Build Your Dream Company
        </h1>
        <p class="text-xl font-light mb-8">
          From ideas to action – start your entrepreneurial journey today.
        </p>
        <button class="bg-white text-blue-600 px-8 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-gray-100 transition">
          Get Started
        </button>
      </div>
    </section>

    <section class="py-16">
      <h2 class="text-4xl font-bold text-center mb-12">How It Works</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 px-8">
        <div
          v-for="step in steps"
          :key="step.title"
          class="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition transform"
        >
          <div class="text-5xl mb-4 text-blue-600">{{ step.icon }}</div>
          <h3 class="text-lg font-semibold mb-2 text-gray-700">{{ step.step }}</h3>
          <h4 class="text-xl font-bold mb-4 text-gray-900">{{ step.title }}</h4>
          <p class="text-gray-600">{{ step.description }}</p>
        </div>
      </div>
    </section>

    <section class="py-16 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center rounded-t-lg">
      <h2 class="text-4xl font-bold mb-4">Ready to Begin?</h2>
      <p class="text-lg font-light mb-6">
        Start building your dream company with the right tools and resources.
      </p>
      <button class="bg-white text-blue-600 px-10 py-4 rounded-lg shadow-md text-lg font-semibold hover:bg-gray-100 transition">
        Launch Your Business
      </button>
    </section>
  </main>
</template>
