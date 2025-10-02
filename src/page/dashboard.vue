<template>
  <div class="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white">

    <!-- Sticky Navbar -->
    <Navbar />

    <!-- Hero / Search -->
    <section class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          v-model="searchQuery"
          @keyup.enter="searchAnime"
          placeholder="Cari anime..."
          class="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
        />
        <button
          @click="searchAnime"
          class="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-400 transition text-white font-semibold"
        >
          Cari
        </button>
      </div>
    </section>

    <!-- Content -->
    <main class="max-w-7xl mx-auto px-6 pb-10">
      <!-- Loading Skeleton -->
      <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div v-for="n in 5" :key="'skeleton-' + n" class="rounded-2xl bg-white/5 p-4 animate-pulse aspect-[9/16]"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="mb-6 p-4 rounded-lg bg-red-100 text-red-700 firasans-font text-center">
        ⚠️ Gagal memuat data: {{ errorMessage }}
      </div>

      <!-- Search Results -->
      <div v-else-if="isSearching">
        <h2 class="text-2xl font-bold text-red-400 lato-font mb-6">🔍 Hasil Pencarian</h2>
        <div v-if="searchResults.length" class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <article
            v-for="(anime, idx) in searchResults"
            :key="anime.slug ?? idx"
            class="bg-white/5 rounded-2xl shadow-lg hover:scale-105 hover:bg-white/10 transition transform overflow-hidden"
          >
            <router-link :to="`/anime/${extractSlug(anime.slug)}`" class="block">
              <div class="w-full aspect-[9/16] overflow-hidden">
                <img :src="anime.poster" :alt="anime.title" class="w-full h-full object-cover"/>
              </div>
              <div class="p-3">
                <h3 class="text-lg font-semibold truncate" :title="anime.title">{{ anime.title }}</h3>
                <p v-if="anime.episode_count" class="text-sm text-gray-300 mt-1">Episode: {{ anime.episode_count }}</p>
              </div>
            </router-link>
          </article>
        </div>
        <div v-else class="p-6 rounded-lg bg-white/5 text-center text-gray-300">
          Tidak ada anime yang sesuai pencarian.
        </div>
      </div>

      <!-- Default Home List -->
      <div v-else>
        <!-- Ongoing -->
        <section class="mb-12">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-red-400 lato-font">📺 Ongoing Anime</h2>
            <router-link 
              to="/ongoing-list"
              class="text-sm bg-red-500 hover:bg-red-400 px-3 py-1 rounded-lg transition"
            >
              Lihat Semua →
            </router-link>
          </div>

          <div v-if="ongoing.length" class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <article
              v-for="(anime, idx) in ongoing"
              :key="anime.slug ?? idx"
              class="bg-white/5 rounded-2xl shadow-lg hover:scale-105 hover:bg-white/10 transition transform overflow-hidden"
            >
              <router-link :to="`/anime/${extractSlug(anime.slug)}`" class="block">
                <div class="w-full aspect-[9/16] overflow-hidden">
                  <img :src="anime.poster" :alt="anime.title" class="w-full h-full object-cover rounded-t-xl"/>
                </div>
                <div class="p-3">
                  <h3 class="text-lg font-semibold truncate" :title="anime.title">{{ anime.title }}</h3>
                </div>
              </router-link>
            </article>
          </div>
          <div v-else class="p-6 rounded-lg bg-white/5 text-center text-gray-300">
            Tidak ada ongoing anime saat ini.
          </div>
        </section>

        <!-- Completed -->
        <section>
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-red-400 lato-font">✅ Completed Anime</h2>
            <router-link 
              :to="{ name: 'CompletedList', params: { page: 1 } }"
              class="text-sm bg-red-500 hover:bg-red-400 px-3 py-1 rounded-lg transition"
            >
              Lihat Semua →
            </router-link>
          </div>

          <div v-if="complete.length" class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <article
              v-for="(anime, idx) in complete"
              :key="anime.slug ?? idx"
              class="bg-white/5 rounded-2xl shadow-lg hover:scale-105 hover:bg-white/10 transition transform overflow-hidden"
            >
              <router-link :to="`/anime/${extractSlug(anime.slug)}`" class="block">
                <div class="w-full aspect-[9/16] overflow-hidden">
                  <img :src="anime.poster" :alt="anime.title" class="w-full h-full object-cover rounded-t-xl"/>
                </div>
                <div class="p-3">
                  <h3 class="text-lg font-semibold truncate" :title="anime.title">{{ anime.title }}</h3>
                </div>
              </router-link>
            </article>
          </div>
          <div v-else class="p-6 rounded-lg bg-white/5 text-center text-gray-300">
            Tidak ada anime yang selesai saat ini.
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from '@/assets/navbar.vue';
import api from '@/plugins/axios';
import { ref, computed, onMounted } from 'vue';

const animeList = ref(null);
const loading = ref(true);
const error = ref(false);
const errorMessage = ref('');
const searchQuery = ref('');

// helper slug extractor
const extractSlug = (url) => {
  if (!url) return '';
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1];
};

// fetch home
const getAnimeList = async () => {
  loading.value = true;
  error.value = false;
  errorMessage.value = '';
  try {
    const res = await api.get('anime/home');
    animeList.value = res?.data?.data ?? null;
  } catch (err) {
    console.error(err);
    error.value = true;
    errorMessage.value = err?.response?.data?.message || err.message || 'Unknown error';
  } finally { loading.value = false; }
};

// search
const searchAnime = async () => {
  if (!searchQuery.value.trim()) {
    getAnimeList();
    return;
  }
  loading.value = true;
  error.value = false;
  errorMessage.value = '';
  try {
    const res = await api.get(`anime/search/${searchQuery.value}`);
    animeList.value = {
      ongoing_anime: res?.data?.search_results ?? [],
      complete_anime: []
    };
  } catch (err) {
    console.error(err);
    error.value = true;
    errorMessage.value = err?.response?.data?.message || err.message || 'Unknown error';
  } finally { loading.value = false; }
};

onMounted(getAnimeList);

// computed
const ongoing = computed(() => animeList.value?.ongoing_anime ?? []);
const complete = computed(() => animeList.value?.complete_anime ?? []);
const isSearching = computed(() => searchQuery.value.trim() !== '');
const searchResults = computed(() => ongoing.value);
</script>
