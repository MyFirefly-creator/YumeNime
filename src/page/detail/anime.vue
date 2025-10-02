<template>
  <div class="min-h-screen bg-gray-900 text-white">

    <!-- Navbar -->
    <header class="sticky top-0 z-50 bg-[#1a1a2e]/90 backdrop-blur-md shadow-md">
      <div class="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <div>
          <h1 class="text-3xl font-bold lato-font text-red-400">YumeNime</h1>
          <p class="mt-1 text-sm opensans-font text-gray-300">Tempat menonton anime favorit — ringkas & elegan.</p>
        </div>

        <nav class="flex items-center gap-4">
          <router-link to="/" class="opensans-font px-4 py-2 rounded-md hover:bg-white/10 transition">Home</router-link>
          <router-link to="/anime-list" class="opensans-font px-4 py-2 rounded-md hover:bg-white/10 transition">Anime List</router-link>
          <router-link to="/dashboard" class="opensans-font px-4 py-2 rounded-md bg-red-500 hover:bg-red-400 transition">Dashboard</router-link>
        </nav>
      </div>
    </header>

    <!-- Konten -->
    <div class="px-6 py-6">

      <!-- Loader Skeleton -->
      <div v-if="!animeDetail" class="space-y-4 animate-pulse max-w-5xl mx-auto">
        <div class="w-full h-96 bg-gray-700 rounded-xl mx-auto"></div>
        <div class="h-6 bg-gray-700 rounded w-1/2 mx-auto"></div>
        <div class="h-4 bg-gray-700 rounded w-1/3 mx-auto"></div>
      </div>

      <!-- Anime Detail -->
      <div v-else class="max-w-5xl mx-auto space-y-6">

        <!-- Poster & Info -->
        <div class="flex flex-col md:flex-row gap-6 items-start">
          <img :src="animeDetail.poster" alt="Poster" class="w-64 rounded-xl shadow-lg" />
          <div class="flex-1 space-y-2">
            <h1 class="text-3xl font-bold">{{ animeDetail.title }}</h1>
            <h2 class="text-xl text-gray-400">{{ animeDetail.japanese_title }}</h2>
            <p><span class="font-semibold">Rating:</span> {{ animeDetail.rating }}</p>
            <p><span class="font-semibold">Status:</span> {{ animeDetail.status }}</p>
            <p><span class="font-semibold">Studio:</span> {{ animeDetail.studio }}</p>
            <p><span class="font-semibold">Produser:</span> {{ animeDetail.produser }}</p>
            <p><span class="font-semibold">Type:</span> {{ animeDetail.type }}</p>
          </div>
        </div>

        <!-- Synopsis -->
        <section class="space-y-2">
          <h3 class="text-2xl font-semibold">Synopsis</h3>
          <p class="text-gray-300">{{ animeDetail.synopsis || "Tidak ada synopsis." }}</p>
        </section>

        <!-- Genres -->
        <section class="space-y-2">
          <h3 class="text-2xl font-semibold">Genres</h3>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="genre in animeDetail.genres" 
              :key="genre.id" 
              class="px-3 py-1 bg-red-600 rounded-full text-sm"
            >
              {{ genre.name }}
            </span>
          </div>
        </section>

        <!-- Episode List -->
        <section class="space-y-2">
          <h3 class="text-2xl font-semibold">Episodes</h3>
          <ul class="grid md:grid-cols-4 gap-2">
            <li v-for="episode in animeDetail.episode_lists" :key="episode.slug">
              <router-link
                :to="`/anime/episode/${episode.slug}`"
                class="block px-3 py-2 bg-gray-800 rounded hover:bg-red-500 transition text-center"
              >
                {{ episode.episode }}
              </router-link>
            </li>
          </ul>
        </section>

        <!-- Recommendations -->
        <section class="space-y-2">
          <h3 class="text-2xl font-semibold">Recommendations</h3>
          <div class="grid md:grid-cols-5 gap-4">
            <div v-for="rec in animeDetail.recommendations" :key="rec.slug" class="text-center">
              <img :src="rec.poster" alt="poster" class="rounded shadow-lg w-full" />
              <p class="mt-2 text-sm">{{ rec.title }}</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/plugins/axios'

const route = useRoute()
const animeDetail = ref(null)

const getAnimeDetail = async () => {
  try {
    const slug = route.params.slug
    const response = await api.get(`anime/anime/${slug}`)
    animeDetail.value = response.data.data
  } catch (error) {
    console.error('Error fetching anime detail:', error)
  }
}

onMounted(getAnimeDetail)
</script>
