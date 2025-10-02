<template>
  <div class="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white">

     <Navbar />

    <div class="max-w-7xl mx-auto px-6 py-10">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-red-400 lato-font">📺 Semua Ongoing Anime</h1>
        <router-link 
          to="/"
          class="text-sm bg-red-500 hover:bg-red-400 px-3 py-1 rounded-lg transition"
        >
          ← Kembali
        </router-link>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div v-for="n in 10" :key="'skeleton-'+n" class="rounded-2xl bg-white/5 p-4 animate-pulse h-64"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="p-4 rounded-lg bg-red-100 text-red-700 text-center firasans-font">
        ⚠️ Gagal memuat data: {{ errorMessage }}
      </div>

      <!-- Anime List -->
      <div v-else>
        <div v-if="ongoingAnime.length" class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <article
            v-for="(anime, idx) in ongoingAnime"
            :key="anime.slug ?? idx"
            class="bg-white/5 rounded-2xl p-3 shadow-lg hover:scale-105 hover:bg-white/10 transition transform"
          >
            <router-link :to="`/anime/${anime.slug}`" class="block">
              <img :src="anime.poster" :alt="anime.title" class="w-full h-56 object-cover rounded-xl mb-3"/>
              <h3 class="text-lg font-semibold truncate" :title="anime.title">{{ anime.title }}</h3>
              <p class="text-sm text-gray-300">📅 {{ anime.release_day }} | {{ anime.current_episode }}</p>
              <p class="text-xs text-gray-400">Update: {{ anime.newest_release_date }}</p>
            </router-link>
          </article>
        </div>

        <!-- Empty -->
        <div v-else class="p-6 rounded-lg bg-white/5 text-center text-gray-300">
          Tidak ada ongoing anime saat ini.
        </div>

        <!-- Pagination -->
        <div v-if="pagination" class="flex items-center justify-center mt-10 gap-3">
          <button
            :disabled="!pagination.has_previous_page"
            @click="changePage(pagination.current_page - 1)"
            class="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-40"
          >
            ← Prev
          </button>
          <span class="text-sm text-gray-300">
            Halaman {{ pagination.current_page }} dari {{ pagination.last_visible_page }}
          </span>
          <button
            :disabled="!pagination.has_next_page"
            @click="changePage(pagination.current_page + 1)"
            class="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/assets/navbar.vue';
import api from '@/plugins/axios';
import { ref, onMounted } from 'vue';

const ongoingAnime = ref([]);
const pagination = ref(null);
const loading = ref(true);
const error = ref(false);
const errorMessage = ref('');

const getOngoing = async (page = 1) => {
  loading.value = true;
  error.value = false;
  errorMessage.value = '';
  try {
    const res = await api.get(`anime/ongoing-anime?page=${page}`);
    ongoingAnime.value = res.data.data.ongoingAnimeData ?? [];
    pagination.value = res.data.data.paginationData ?? null;
  } catch (err) {
    console.error('Error fetching ongoing anime:', err);
    error.value = true;
    errorMessage.value = err?.response?.data?.message || err.message;
  } finally {
    loading.value = false;
  }
};

const changePage = (page) => {
  if (!pagination.value) return;
  getOngoing(page);
};

onMounted(() => getOngoing(1));
</script>
