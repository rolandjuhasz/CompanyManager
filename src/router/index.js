import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/Auth/RegisterView.vue";
import LoginView from "../views/Auth/LoginView.vue";
import { useAuthStore } from "@/stores/auth";
import MyCompaniesView from "@/views/Companies/MyCompaniesView.vue";
import CreateCompany from "@/components/CreateCompany.vue";
import ShowCompanyView from "@/views/Companies/ShowCompanyView.vue";
import EmployeView from "@/views/Employees/EmployeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: { guest: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { guest: true },
    },
    {
      path: "/companies",
      name: "companies",
      component: MyCompaniesView,
      meta: { auth: true },
    },
    {
      path: "/companies/create",
      name: "create",
      component: CreateCompany,
      meta: { auth: true },
    },
    {
      path: "/companies/show/:id", // Itt az :id az útvonal paraméter
      name: "show",
      component: ShowCompanyView,
      meta: { auth: true },
    },
    {
      path: '/companies/show/:id',
      component: EmployeView,
    }
    
    

  ],
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  await authStore.getUser();

  if (authStore.user && to.meta.guest) {
    return { name: "home" };
  }

  if (!authStore.user && to.meta.auth) {
    return { name: "login" };
  }
});

export default router;