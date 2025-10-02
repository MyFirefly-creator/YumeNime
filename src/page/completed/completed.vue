<template>
  <div class="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white">

    <Navbar />

    <div class="max-w-7xl mx-auto px-6 py-10">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-red-400 lato-font">✅ Completed Anime</h1>
        <router-link 
          to="/"
          class="text-sm bg-red-500 hover:bg-red-400 px-3 py-1 rounded-lg transition"
        >
          ← Kembali
        </router-link>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div v-for="n in 10" :key="'skeleton-'+n" class="rounded-2xl bg-white/5 p-4 animate-pulse aspect-[9/16]"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="p-4 rounded-lg bg-red-100 text-red-700 text-center firasans-font">
        ⚠️ Gagal memuat data: {{ errorMessage }}
      </div>

      <!-- Anime List -->
      <div v-else>
        <div v-if="completedAnime.length" class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <article
            v-for="(anime, idx) in completedAnime"
            :key="anime.slug ?? idx"
            class="bg-white/5 rounded-2xl shadow-lg hover:scale-105 hover:bg-white/10 transition transform overflow-hidden"
          >
            <router-link :to="`/anime/${anime.slug}`" class="block">
              <!-- Gambar 9:16 -->
              <div class="w-full aspect-[9/16] overflow-hidden">
                <img :src="anime.poster" :alt="anime.title" class="w-full h-full object-cover rounded-t-xl"/>
              </div>
              <!-- Info -->
              <div class="p-3">
                <h3 class="text-lg font-semibold truncate" :title="anime.title">{{ anime.title }}</h3>
                <p class="text-sm text-gray-300 mt-1">🎞️ {{ anime.episode_count }} episode</p>
                <p class="text-sm text-yellow-400 font-semibold">⭐ {{ anime.rating }}</p>
              </div>
            </router-link>
          </article>
        </div>

        <!-- Empty -->
        <div v-else class="p-6 rounded-lg bg-white/5 text-center text-gray-300">
          Tidak ada completed anime.
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
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const completedAnime = ref([]);
const pagination = ref(null);
const loading = ref(true);
const error = ref(false);
const errorMessage = ref('');

const getCompleted = async () => {
  loading.value = true;
  error.value = false;
  errorMessage.value = '';
  try {
    const page = route.params.page ?? 1;
    const res = await api.get(`anime/complete-anime/${page}`);
    completedAnime.value = res.data.data.completeAnimeData ?? [];
    pagination.value = res.data.data.paginationData ?? null;
  } catch (err) {
    console.error('Error fetching completed anime:', err);
    error.value = true;
    errorMessage.value = err?.response?.data?.message || err.message;
  } finally {
    loading.value = false;
  }
};

const changePage = (page) => {
  router.push(`/completed-list/${page}`);
};

onMounted(getCompleted);

// Watch route param supaya otomatis fetch ulang saat ganti halaman
watch(
  () => route.params.page,
  () => {
    getCompleted();
  }
);
</script>
