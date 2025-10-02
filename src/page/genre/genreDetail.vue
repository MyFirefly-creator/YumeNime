<template>
  <div class="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-[#1a1a2e]/90 backdrop-blur-md shadow-md">
      <div class="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <div>
          <h1 class="text-3xl font-bold lato-font text-red-400">YumeNime</h1>
          <p class="mt-1 text-sm opensans-font text-gray-300">
            Anime berdasarkan genre pilihanmu
          </p>
        </div>
        <nav class="flex items-center gap-4">
          <router-link to="/" class="px-4 py-2 rounded-md hover:bg-white/10 transition">Home</router-link>
          <router-link to="/genre-list" class="px-4 py-2 rounded-md hover:bg-white/10 transition">Genre List</router-link>
          <router-link to="/dashboard" class="px-4 py-2 rounded-md bg-red-500 hover:bg-red-400 transition">Dashboard</router-link>
        </nav>
      </div>
    </header>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-6 py-8">
      <h2 class="text-2xl font-bold text-red-400 lato-font mb-6">
        🎭 Genre: {{ route.params.slug }}
      </h2>

      <!-- Anime List -->
      <div v-if="genreDetail?.anime?.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <router-link
          v-for="anime in genreDetail.anime"
          :key="anime.slug"
          :to="`/anime/${anime.slug}`"
          class="group bg-[#0f172a] rounded-xl shadow-md hover:shadow-lg hover:bg-[#1e293b] transition overflow-hidden"
        >
          <img :src="anime.poster" :alt="anime.title" class="w-full h-56 object-cover group-hover:scale-105 transition-transform" />
          <div class="p-3">
            <h3 class="text-sm font-bold mb-1 line-clamp-2">{{ anime.title }}</h3>
            <p class="text-xs text-gray-400">🎬 {{ anime.episode_count || "??" }} eps</p>
            <p class="text-xs text-gray-400">⭐ {{ anime.rating || "N/A" }}</p>
            <p class="text-xs text-gray-400">📅 {{ anime.season || "-" }}</p>
          </div>
        </router-link>
      </div>

      <!-- Pagination -->
      <div v-if="genreDetail?.pagination" class="flex justify-center items-center gap-4 mt-10">
        <button
          :disabled="!genreDetail.pagination.has_previous_page"
          @click="changePage(genreDetail.pagination.current_page - 1)"
          class="px-4 py-2 rounded-md bg-red-500 hover:bg-red-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <span class="text-gray-300">
          Page {{ genreDetail.pagination.current_page }} / {{ genreDetail.pagination.last_visible_page }}
        </span>
        <button
          :disabled="!genreDetail.pagination.has_next_page"
          @click="changePage(genreDetail.pagination.next_page)"
          class="px-4 py-2 rounded-md bg-red-500 hover:bg-red-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/plugins/axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const genreDetail = ref(null);

const getGenreDetail = async (page = 1) => {
  try {
    const genre = route.params.slug;
    const res = await api.get(`anime/genre/${genre}?page=${page}`);
    genreDetail.value = res.data.data;
    console.log("Fetched genre detail:", genreDetail.value);
  } catch (error) {
    console.error("Error fetching genre detail:", error);
  }
};

const changePage = (page) => {
  if (page > 0) {
    getGenreDetail(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

onMounted(() => getGenreDetail());
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
