import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useCompanyStore = defineStore("companyStore", {
  state: () => ({
    errors: {},
  }),
  actions: {
    /******************* Get all company (only user-related companies) *******************/
    async getAllCompany() {
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

    /******************* Get a company by ID *******************/
    async getCompany(companyId) {
      const res = await fetch(`/api/companies/${companyId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      return data.company;
    },

    /******************* Create a company *******************/
    async createCompany(formData) {
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

    /******************* Delete a company *******************/
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
