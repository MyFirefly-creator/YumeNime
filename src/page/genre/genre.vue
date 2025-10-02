<template>
  <div class="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white">

    <header class="sticky top-0 z-50 bg-[#1a1a2e]/90 backdrop-blur-md shadow-md">
      <div class="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <div>
          <h1 class="text-3xl font-bold lato-font text-red-400">YumeNime</h1>
          <p class="mt-1 text-sm opensans-font text-gray-300">Tempat menonton anime favorit — ringkas & elegan.</p>
        </div>

        <nav class="flex items-center gap-4">
          <router-link to="/" class="opensans-font px-4 py-2 rounded-md hover:bg-white/10 transition">Home</router-link>
          <router-link to="/genre-list" class="opensans-font px-4 py-2 rounded-md hover:bg-white/10 transition">Genre List</router-link>
          <router-link to="/dashboard" class="opensans-font px-4 py-2 rounded-md bg-red-500 hover:bg-red-400 transition">Dashboard</router-link>
        </nav>
      </div>
    </header>

    <h2 class="text-2xl font-bold text-red-400 lato-font mb-6 mt-3 ml-3">🎨 Genres</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mr-3 ml-3">
        <router-link
            v-for="genre in genreList"
            :key="genre.slug"
            :to="`/genre/${genre.slug}`"
            class="block px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-red-500 hover:text-white transition font-medium text-center"
        >
            {{ genre.name }}
        </router-link>
    </div>
  </div>
</template>

<script setup>
import api from '@/plugins/axios';
import { onMounted, ref } from 'vue';

const genreList = ref([]);

const getGenre = async () => {
  try {
    const response = await api.get('anime/genre');
    genreList.value = response.data.data;
    console.log('Fetched genres:', genreList.value);
  } catch (error) {
    console.error('Error fetching genre:', error);
  }
};

onMounted(getGenre);
</script>

<style>
/* opsional: font atau styling tambahan */
</style>
