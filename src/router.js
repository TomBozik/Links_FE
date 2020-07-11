import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login';
import Register from '@/views/Register';
import Dashboard from '@/views/Dashboard';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { guestOnly: true }
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: { guestOnly: true }
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: { authOnly: true }
    },
    { path: "*", redirect: "/dashboard" },
  ]
})


function isLoggedIn(){
    return localStorage.getItem('token');
}


router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.authOnly)) {
    if (!isLoggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } 
  else if (to.matched.some(record => record.meta.guestOnly)) {
      if (isLoggedIn()) {
        next({ path: '/dashboard'})
      } else {
        next()
      }
  } else {
    next()
  }

})
export default router;