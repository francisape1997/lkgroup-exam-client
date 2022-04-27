import { createRouter, createWebHistory } from 'vue-router'

// Layout
import MainLayout from '../layouts/MainLayout.vue';

// Pages
import Players from '../views/players/index.vue';
import PlayerForm from '../views/players/form.vue';

const routes = [
  { path: '/:pathMatch(.*)*', name: 'Not Found', component: () => import('../views/error/404/index.vue') },

  // Players
  {
      path: '/',
      component: MainLayout,
      children:
      [
          {
              path: 'players',
              component: Players,
          },
          {
              path: 'player/create',
              component: PlayerForm,
              meta:
              {
                  page: 'create',
              },
          },
          {
              path: 'player/:id/edit',
              component: PlayerForm,
          },
          {
            path: '/',
            redirect: '/players',
        }
      ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
