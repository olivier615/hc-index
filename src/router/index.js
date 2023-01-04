import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/list',
    component: () => import('../views/showWinnerView.vue')
  },
  {
    path: '/party',
    component: () => import('../views/endYearPartyView.vue'),
    children: [
      {
        path: 'count',
        component: () => import('../views/countingView.vue')
      },
      {
        path: 'draw',
        component: () => import('../views/luckyDrawView.vue')
      },
      {
        path: 'bonus',
        component: () => import('../views/bonusView.vue')
      }
    ]
  },
  {
    path: '/a',
    component: () => import('../views/indexAView.vue')
  },
  {
    path: '/b',
    component: () => import('../views/indexBView.vue')
  },
  {
    path: '/q-manual',
    component: () => import('../views/indexQ-manualView.vue')
  },
  {
    path: '/q',
    component: () => import('../views/indexQView.vue')
  },
  // {
  //   path: '/signIn',
  //   component: () => import('../views/signInView.vue')
  // },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  }
  // {
  //   path: '/backEnd',
  //   component: () => import('../views/backEndView.vue'),
  //   children: [
  //     {
  //       path: 'banner',
  //       component: () => import('../views/bannerView.vue')
  //     },
  //     {
  //       path: 'notice',
  //       component: () => import('../views/noticeView.vue')
  //     },
  //     {
  //       path: 'h5Link',
  //       component: () => import('../views/h5LinkView.vue')
  //     },
  //     {
  //       path: 'weChatLink',
  //       component: () => import('../views/weChatLinkView.vue')
  //     },
  //     {
  //       path: 'onLink',
  //       component: () => import('../views/onLinkView.vue')
  //     },
  //     {
  //       path: 'service',
  //       component: () => import('../views/serviceView.vue')
  //     },
  //     {
  //       path: 'uploadImage',
  //       component: () => import('../views/uploadImageView.vue')
  //     },
  //     {
  //       path: 'timestamp',
  //       component: () => import('../views/timestampView.vue')
  //     }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
