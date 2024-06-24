import { createRouter, createWebHashHistory } from 'vue-router';
import NotFoundView from '../modules/posts/shared/views/NotFoundView.vue';
const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../modules/posts/views/PostView.vue')
  },
  {
    path: '/post-detail/:id',
    name: 'post-detal',
    component: () => import('../modules/posts/views/PostDetailView.vue')
  },
  {
    path: '/',
    name: 'main',
    component: () => import('../modules/posts/views/PostView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView
  }
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
});

export default router;