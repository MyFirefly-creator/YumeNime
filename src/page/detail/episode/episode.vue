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

    <div class="max-w-5xl mx-auto px-6">

      <!-- Loader Skeleton -->
      <div v-if="!episodeDetail" class="space-y-4 animate-pulse">
        <div class="w-full h-96 bg-gray-700 rounded-lg"></div>
        <div class="h-6 bg-gray-700 rounded w-1/2"></div>
        <div class="h-4 bg-gray-700 rounded w-1/3"></div>
      </div>

      <!-- Episode Detail -->
      <div v-else class="space-y-6">

        <!-- Episode Info -->
        <div>
          <h1 class="text-3xl font-bold mb-2">{{ episodeDetail.episode }}</h1>
          <p class="text-gray-300">
            <span class="font-semibold">Anime:</span>
            <router-link 
              :to="`/anime/${animeSlug}`" 
              class="text-red-400 hover:underline"
            >
              Lihat Detail Anime
            </router-link>
          </p>
        </div>

        <!-- Streaming -->
        <div v-if="krakenLinks.length" class="space-y-3">
          <h2 class="text-xl font-semibold">Streaming (KrakenFiles)</h2>

          <!-- Resolusi Buttons -->
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="link in krakenLinks" 
              :key="link.resolution" 
              @click="selectedSrc = link.url"
              :class="[ 
                'px-3 py-1 rounded text-sm transition', 
                selectedSrc === link.url ? 'bg-red-500 text-white' : 'bg-gray-700 hover:bg-red-500' 
              ]"
            >
              {{ link.resolution }}
            </button>
          </div>

          <!-- Player -->
          <iframe 
            :src="selectedSrc" 
            frameborder="0" 
            allowfullscreen 
            class="w-full h-[600px] rounded-lg shadow-lg"
          ></iframe>
        </div>

        <!-- Download Links -->
        <div v-if="episodeDetail.download_urls" class="space-y-4">
          <h2 class="text-xl font-semibold">Download Links</h2>
          <div v-for="(files, format) in episodeDetail.download_urls" :key="format" class="space-y-2">
            <h3 class="text-lg font-semibold capitalize">{{ format }}</h3>
            <div v-for="file in files" :key="file.resolution">
              <p class="font-medium">{{ file.resolution }}</p>
              <ul class="flex flex-wrap gap-2 mt-1">
                <li v-for="urlObj in file.urls" :key="urlObj.provider">
                  <a 
                    :href="urlObj.url" 
                    target="_blank" 
                    class="px-3 py-1 bg-gray-800 rounded hover:bg-red-500 transition text-sm"
                  >
                    {{ urlObj.provider }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex justify-between mt-6">
          <router-link 
            v-if="episodeDetail.has_previous_episode" 
            :to="{ name: 'AnimeEpisode', params: { episodeSlug: prevEpisodeSlug } }"
            class="px-4 py-2 bg-gray-700 rounded hover:bg-red-500 transition"
          >
            ⬅️ Previous
          </router-link>

          <router-link 
            v-if="episodeDetail.has_next_episode" 
            :to="{ name: 'AnimeEpisode', params: { episodeSlug: nextEpisodeSlug } }"
            class="ml-auto px-4 py-2 bg-gray-700 rounded hover:bg-red-500 transition"
          >
            Next ➡️
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/plugins/axios'

const route = useRoute()
const episodeDetail = ref(null)
const krakenLinks = ref([])
const selectedSrc = ref(null)

// Ambil slug bersih dari URL
const extractSlug = (fullSlug) => fullSlug?.split('/').filter(Boolean).pop() || ''

// Slug untuk link detail anime
const animeSlug = computed(() => extractSlug(episodeDetail.value?.anime?.slug))
const prevEpisodeSlug = computed(() => extractSlug(episodeDetail.value?.previous_episode?.slug))
const nextEpisodeSlug = computed(() => extractSlug(episodeDetail.value?.next_episode?.slug))

// 🔥 fungsi buat resolve safelink jadi embed kraken
const resolveKraken = async (safelink) => {
  try {
    const res = await fetch(`/api/proxy?url=${encodeURIComponent(safelink)}`)
    const data = await res.json()

    if (data.embedUrl) {
      return data.embedUrl
    }
  } catch (err) {
    console.error("Resolve failed:", err)
  }
  return null
}

const getEpisodeDetail = async () => {
  try {
    const slug = route.params.episodeSlug
    const response = await api.get(`anime/episode/${slug}`)
    episodeDetail.value = response.data.data
    console.log('Fetched episode detail:', episodeDetail.value)

    const links = {}

    for (let format in episodeDetail.value.download_urls || {}) {
      for (const file of episodeDetail.value.download_urls[format]) {
        const kfiles = file.urls.find(u => u.provider.toLowerCase() === 'kfiles')
        if (kfiles) {
          // resolve safelink ke kraken embed
          const embedUrl = await resolveKraken(kfiles.url)
          if (embedUrl) {
            links[file.resolution] = {
              resolution: file.resolution,
              url: embedUrl
            }
          }
        }
      }
    }

    krakenLinks.value = Object.values(links)
    if (krakenLinks.value.length) selectedSrc.value = krakenLinks.value[0].url
  } catch (err) {
    console.error('Error fetching episode detail:', err)
  }
}

watch(
  () => route.params.episodeSlug,
  () => {
    episodeDetail.value = null
    krakenLinks.value = []
    selectedSrc.value = null
    getEpisodeDetail()
  },
  { immediate: true }
)
</script>

<style>
/* Tailwind sudah dipakai, styling tambahan opsional */
</style>
