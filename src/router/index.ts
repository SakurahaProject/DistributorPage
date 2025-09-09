import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import BroadcastScheduleView from '@/views/BroadcastScheduleView.vue';
import LetterView from '@/views/LetterView.vue';
import SiteLinkView from '@/views/SiteLinkView.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/schedule', component: BroadcastScheduleView },
    { path: '/profile', component: AboutView },
    { path: '/letter', component: LetterView },
    { path: '/links', component: SiteLinkView },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
