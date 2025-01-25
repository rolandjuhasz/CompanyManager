import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const usePostsStore = defineStore("postsStore", {
  state: () => ({
    errors: {},
  }),
  actions: {
    /******************* Get all posts (only user-related companies) *******************/
    async getAllPosts() {
      const authStore = useAuthStore();
      const userId = authStore.user.id;

      const res = await fetch(`/api/companies?user_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      return data;
    },

    /******************* Get a post by ID *******************/
    async getPost(companyId) {
      const res = await fetch(`/api/companies/${companyId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      return data.company;
    },

    /******************* Create a post *******************/
    async createPost(formData) {
      const res = await fetch("/api/companies", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.router.push({ name: "companies" });
        this.errors = {};
      }
    },

    /******************* Delete a post *******************/
    async deleteCompany(company) {
        const authStore = useAuthStore();
        if (authStore.user.id === company.user_id) {
          const res = await fetch(`/api/companies/${company.id}`, {
            method: "delete",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
  
          const data = await res.json();
          if (res.ok) {
            this.router.push({ name: "home" });
          }
          console.log(data);
        }
      },
  },
});
