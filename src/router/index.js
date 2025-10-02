import { createRouter, createWebHistory } from "vue-router";
import Index from "@/page/index.vue";
import Dashboard from "@/page/dashboard.vue";
import Anime from "@/page/detail/anime.vue";
import Episode from "@/page/detail/episode/episode.vue";

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
