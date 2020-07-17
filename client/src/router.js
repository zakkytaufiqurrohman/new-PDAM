import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
import store from './store'
Vue.use(VueRouter)

const routes = [
      {
        path: '/',
        redirect: 'dashboard',
        component: DashboardLayout,
        children: [
          {
            path: 'dashboard',
            name: 'Dashboard',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue'),
          },
          {
            path: 'customers',
            name: 'Customers',
            component: () => import(/* webpackChunkName: "demo" */ './views/Customers.vue'),
          },
          {
            path: 'profile',
            name: 'Profile',
            component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue'),
          }
        ],
        meta: {
          requiresAuth: true,
        }
      },
      {
        path: '/',
        name: 'auth',
        redirect: 'login',
        component: AuthLayout,
        children: [
          {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
          },
          {
            path: '/register',
            name: 'register',
            component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
          }
        ]
      }
    ]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!store.getters.isLoggedIn) {
      next({ name: 'auth' })
    } else {
      next()
    }
  }
  next()
})

export default router

// export default new Router({
//   linkExactActiveClass: 'active',
//   mode: 'history',
//   routes: [
//     {
//       path: '/',
//       redirect: 'dashboard',
//       component: DashboardLayout,
//       children: [
//         {
//           path: 'dashboard',
//           name: 'Dashboard',
//           // route level code-splitting
//           // this generates a separate chunk (about.[hash].js) for this route
//           // which is lazy-loaded when the route is visited.
//           component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue'),
//           meta: {
//             requiresAuth: true,
//           }
//         },
//         {
//           path: 'customers',
//           name: 'Customers',
//           component: () => import(/* webpackChunkName: "demo" */ './views/Customers.vue'),
//           meta: {
//             requiresAuth: true,
//           }
//         },
//         {
//           path: 'profile',
//           name: 'Profile',
//           component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue'),
//           meta: {
//             requiresAuth: true,
//           }
//         }
//       ]
//     },
//     {
//       path: '/',
//       redirect: 'login',
//       component: AuthLayout,
//       children: [
//         {
//           path: '/login',
//           name: 'login',
//           component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
//         },
//         {
//           path: '/register',
//           name: 'register',
//           component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
//         }
//       ]
//     }
//   ]
// })
