<template>
  <div class="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white font-sans">
    <!-- Navbar -->
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

    <!-- Hero Section -->
    <section class="flex flex-col items-center justify-center text-center px-6 py-20 relative">
      <h2 class="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-down lato-font">
        Selamat Datang di <span class="text-red-400">YumeNime</span>
      </h2>
      <p class="text-lg text-gray-300 max-w-2xl animate-fade-in-up">
        Tempat terbaik untuk menonton anime favoritmu. Nikmati pengalaman menonton anime dengan tampilan modern, elegan, dan penuh warna.  
      </p>
      <div class="mt-8 flex gap-4 animate-fade-in-up">
       <router-link 
            to="/dashboard" 
            class="px-6 py-3 bg-red-500 rounded-xl shadow-lg hover:bg-red-400 transition transform hover:scale-105 opensans-font inline-block text-white text-center"
            >
            Mulai Menonton
        </router-link>
        <router-link 
            to="/anime-all"
            class="px-6 py-3 bg-gray-700 rounded-xl shadow-lg hover:bg-gray-600 transition transform hover:scale-105"
            >
            Jelajahi Anime
        </router-link>
      </div>
    </section>

    <!-- Highlight Section -->
    <section class="grid md:grid-cols-3 gap-8 px-8 py-16">
      <div class="bg-white/5 rounded-2xl p-6 shadow-lg backdrop-blur-md hover:scale-105 transition transform duration-300 animate-fade-in-up">
        <h3 class="text-xl font-semibold mb-4 text-red-400">Update Terbaru</h3>
        <p class="text-gray-300">Dapatkan anime terbaru setiap minggu dengan update cepat dan akurat.</p>
      </div>
      <div class="bg-white/5 rounded-2xl p-6 shadow-lg backdrop-blur-md hover:scale-105 transition transform duration-300 animate-fade-in-up delay-200">
        <h3 class="text-xl font-semibold mb-4 text-red-400">Kualitas HD</h3>
        <p class="text-gray-300">Nikmati streaming anime dengan kualitas tinggi untuk pengalaman menonton maksimal.</p>
      </div>
      <div class="bg-white/5 rounded-2xl p-6 shadow-lg backdrop-blur-md hover:scale-105 transition transform duration-300 animate-fade-in-up delay-300">
        <h3 class="text-xl font-semibold mb-4 text-red-400">Gratis & Mudah</h3>
        <p class="text-gray-300">Tonton anime favoritmu secara gratis dengan navigasi yang mudah.</p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="text-center py-6 border-t border-white/10 text-gray-400">
      © 2025 YumeNime. All rights reserved.
    </footer>
  </div>
</template>

<script>
export default {
  name: "YumeNimeLanding"
}
</script>

<style>
/* Animasi custom */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease forwards;
}

.animate-fade-in-down {
  animation: fadeInDown 1s ease forwards;
}
</style>
