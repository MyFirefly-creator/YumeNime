<template>
  <div class="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white">
    <div class="max-w-7xl mx-auto px-6 py-10">
      <Navbar />

      <!-- Loading -->
      <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div v-for="n in 15" :key="n" class="rounded-2xl bg-white/5 animate-pulse aspect-[9/16]"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="p-4 rounded-lg bg-red-100 text-red-700 text-center">
        ⚠️ Gagal memuat data: {{ errorMessage }}
      </div>

      <!-- Anime List -->
      <div v-else>
        <div v-for="(group, idx) in paginatedData" :key="idx" class="mb-8">
          <h2 class="text-xl font-bold text-yellow-400 mb-4">{{ group.startWith }}</h2>
          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <article
              v-for="anime in group.animeList"
              :key="anime.animeId"
              class="bg-white/5 rounded-2xl shadow-lg hover:scale-105 hover:bg-white/10 transition transform overflow-hidden"
            >
              <router-link :to="anime.href" class="block">
                <!-- Placeholder image 9:16 (optional) -->
                <div class="w-full aspect-[9/16] bg-white/5 overflow-hidden rounded-t-xl mb-2">
                  <!-- Bisa pakai <img :src="anime.poster" /> jika ada poster -->
                </div>
                <div class="p-3">
                  <h3 class="text-lg font-semibold truncate" :title="anime.title">{{ anime.title }}</h3>
                  <p class="text-sm text-gray-300 truncate">{{ anime.animeId }}</p>
                </div>
              </router-link>
            </article>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-center mt-10 gap-3">
          <button
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
            class="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-40"
          >
            ← Prev
          </button>
          <span class="text-sm text-gray-300">
            Halaman {{ currentPage }} dari {{ totalPages }}
          </span>
          <button
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
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
import { ref, computed, onMounted } from 'vue';

const animeAll = ref([]);
const loading = ref(true);
const error = ref(false);
const errorMessage = ref('');

const currentPage = ref(1);
const perPage = 5; // jumlah group per halaman

const totalPages = computed(() => Math.ceil(animeAll.value.length / perPage));

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return animeAll.value.slice(start, start + perPage);
});

const getAnimeAll = async () => {
  loading.value = true;
  error.value = false;
  errorMessage.value = '';
  try {
    const response = await api.get('anime/unlimited');
    animeAll.value = response.data.data.list ?? [];
  } catch (err) {
    error.value = true;
    errorMessage.value = err?.response?.data?.message || err.message;
    console.error('Error fetching all anime:', err);
  } finally {
    loading.value = false;
  }
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(getAnimeAll);
</script>
