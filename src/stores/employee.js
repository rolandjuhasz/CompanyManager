import { defineStore } from 'pinia';
import { useAuthStore } from './auth';


// const toast = useToast();
export const useEmployeeStore = defineStore('employeeStore', {
  state: () => ({
    employees: [],
    errors: {},
    employee: null,
  }),
  actions: {
    
    async getEmployees() {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("No token found");
          }
      
          const res = await fetch('/api/employees', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
      
          const data = await res.json();
          this.employees = data;
        } catch (error) {
          console.error('Error fetching employees:', error);
          this.errors = { message: error.message };
        }
      },
      
      async getEmployeesById(companyId) {
        console.log('Received companyId:', companyId);
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("No token found");
          }
      
          const res = await fetch(`/api/company/${companyId}/employees`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
      
          const data = await res.json();
          this.employees = data;
        } catch (error) {
          console.error('Error fetching employees:', error);
          this.errors = { message: error.message };
        }
      }
      ,
      

    
    async addEmployee(employeeData, companyId) {
        try {
          const res = await fetch('/api/employees', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ ...employeeData, company_id: companyId }),
          });
      
          const data = await res.json();
          if (res.ok) {
            this.employees.unshift(data);
            return true;
          } else {
            this.errors = data.errors || {};
          }
        } catch (error) {
          console.error('Error adding employee:', error);
          return false;
        }
      },
      

    
    async updateEmployee(id, employeeData) {
      try {
        const res = await fetch(`/api/employees/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(employeeData),
        });

        const data = await res.json();
        if (res.ok) {
          const index = this.employees.findIndex((emp) => emp.id === id);
          this.employees[index] = data;
        //   toast.warning('Employee updated!')
          return true;
        } else {
          this.errors = data.errors || {};
          return false;
        }
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    },


    async deleteEmployee(id) {
      try {
        const res = await fetch(`/api/employees/${id}`, {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (res.ok) {
          this.employees = this.employees.filter((emp) => emp.id != id);
        //   toast.error('Employee deleted!')
        } else {
          const data = await res.json();
          this.errors = data.errors || {};
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    },
  },
});