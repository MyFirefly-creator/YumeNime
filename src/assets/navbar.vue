<template>
    <header class="sticky top-0 z-50 bg-[#1a1a2e]/90 shadow-md">
    <div class="max-w-7xl mx-auto flex items-center justify-between py-6 px-6">
      <div class="flex items-center gap-4">
        <!-- Logo -->
        <img src="./img/Logo.png" alt="YumeNime Logo" class="w-16 h-16 rounded-full"/>

        <!-- Teks dengan typing loop -->
        <div class="flex flex-col">
          <h1 class="lato-font text-red-400 text-2xl font-bold">
            YumeNime
          </h1>
          <p class="opensans-font text-gray-300 text-xs typing-loop overflow-hidden whitespace-nowrap border-r-2 border-gray-300">
            Tempat menonton anime favorit — ringkas & elegan.
          </p>
        </div>
      </div>


      <!-- Desktop Menu -->
      <nav class="hidden md:flex items-center gap-4">
        <router-link to="/" class="opensans-font px-4 py-2 rounded-md hover:bg-white/10 transition">Home</router-link>
        <router-link to="/genre-list" class="opensans-font px-4 py-2 rounded-md hover:bg-white/10 transition">Genre List</router-link>
        <router-link to="/dashboard" class="opensans-font px-4 py-2 rounded-md bg-red-500 hover:bg-red-400 transition">Dashboard</router-link>
      </nav>

      <!-- Mobile Button -->
      <button @click="isOpen = !isOpen" class="border border-red-500 text-gray-200 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Sidebar Mobile -->
    <transition name="slide">
        <div v-if="isOpen" class="fixed inset-0 z-[9999] flex">
            <!-- Overlay -->
            <div class="absolute inset-0 bg-gray-900/80" @click="isOpen = false"></div>

                <!-- Sidebar fullscreen langsung di sini -->
               <div
                    class="relative ml-auto w-64 h-screen bg-[#1a1a2e] p-6 flex flex-col transform transition-transform duration-300 shadow-xl"
                    :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
                >
                <h2 class="text-2xl font-bold text-red-400 mb-6">Menu</h2>
                <router-link @click="isOpen = false" to="/" class="block px-4 py-2 rounded-md hover:bg-white/10 transition">Home</router-link>
                <router-link @click="isOpen = false" to="/genre-list" class="block px-4 py-2 rounded-md hover:bg-white/10 transition">Genre List</router-link>
                <router-link @click="isOpen = false" to="/dashboard" class="block px-4 py-2 rounded-md bg-red-500 hover:bg-red-400 transition">Dashboard</router-link>
            </div>
        </div>
    </transition>
  </header>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isOpen: false
    }
  }
}
</script>

<style scoped>
/* Transisi Sidebar */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}

/* Typing + deleting loop */
@keyframes typingLoop {
  0% { width: 0 }
  40% { width: 100% }
  60% { width: 100% }
  100% { width: 0 }
}

.typing-loop {
  width: 0;
  animation: typingLoop 6s steps(50, end) infinite;
}
</style>
