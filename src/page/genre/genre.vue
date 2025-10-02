<template>
  <div class="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white">

    <Navbar />

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
import Navbar from '@/assets/navbar.vue';
import api from '@/plugins/axios';
import { onMounted, ref } from 'vue';

const genreList = ref([]);

const getGenre = async () => {
  try {
    const response = await api.get('anime/genre');
    genreList.value = response.data.data;
  } catch (error) {
    console.error('Error fetching genre:', error);
  }
};

onMounted(getGenre);
</script>

<style>
/* opsional: font atau styling tambahan */
</style>
