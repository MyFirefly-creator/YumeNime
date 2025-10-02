import { createRouter, createWebHistory } from "vue-router";
import Index from "@/page/index.vue";
import Dashboard from "@/page/dashboard.vue";
import Anime from "@/page/detail/anime.vue";
import Episode from "@/page/detail/episode/episode.vue";
import Genre from "@/page/genre/genre.vue";
import GenreDetail from "@/page/genre/genreDetail.vue";
import Ongoing from "@/page/ongoing/ongoing.vue";
import Completed from "@/page/completed/completed.vue";
import AnimeAll from "@/page/animeAll.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Index
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/anime/:slug",
    name: "AnimeDetail",
    component: Anime
  },
  {
    path: "/anime/episode/:episodeSlug",
    name: "AnimeEpisode",
    component: Episode,
    props: true
  },
  {
    path: "/genre-list",
    name: "GenreList",
    component: Genre  
  },
  {
    path: "/genre/:slug",
    name: "GenreDetail",
    component: GenreDetail, // file Vue yang kamu tunjukkan tadi
  },
  {
    path: "/ongoing-list",
    name: "OngoingList",
    component: Ongoing
  },
  {
    path: "/completed-list/:page?",
    name: "CompletedList",
    component: Completed
  },
  {
    path: "/anime-all", 
    name: "AnimeAll",
    component: AnimeAll
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
