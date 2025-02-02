<script setup>
import { useAuthStore } from '@/stores/auth';
import { useEmployeeStore } from '@/stores/employee';
import { onMounted, ref } from 'vue';
import {useRoute } from "vue-router";

const route = useRoute();
const employeeStore = useEmployeeStore();
const authStore = useAuthStore();
const company = ref(null);
const employees = ref([]);

const employeeToUpdate = ref({
  id: null,
  name: '',
  email: '',
  phone_number: '',
  position: '',
  hire_date: ''
});

const isUpdated = ref(false);

const deleteEmployee = (id) => {
  employeeStore.deleteEmployee(id);
};

const updateEmployee = async () => {
  if (employeeToUpdate.value.id) {
    try {
      const updatedEmployee = await employeeStore.updateEmployee(employeeToUpdate.value.id, employeeToUpdate.value);
      if (updatedEmployee) {
        isUpdated.value = true;
        resetEmployeeForm();
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  }
};


const resetEmployeeForm = () => {
  employeeToUpdate.value = {
    id: null,
    name: '',
    email: '',
    phone_number: '',
    position: '',
    hire_date: ''
  };
  isUpdated.value = false;
};

onMounted(async () => {
  const companyId = 22;
  await employeeStore.getEmployeesById(companyId);  // Most már átadjuk a companyId-t
});


</script>

<template>
  <div class="employees-container">
    <h2>Employee List</h2>
    <div v-if="employeeStore.employees.length">
      <div class="employees-list">
        <ul>
          <li v-for="employee in employeeStore.employees" :key="employee.id">
            <h3>{{ employee.name }}</h3>
            <p>Email: {{ employee.email }}</p>
            <p>Phone: {{ employee.phone_number }}</p>
            <p>Position: {{ employee.position }}</p>
            <p>Hire Date: {{ employee.hire_date }}</p>
            <button @click="deleteEmployee(employee.id)" class="submit-btn">Delete</button>
            <button @click="employeeToUpdate = {...employee}" class="update-btn">Update</button>
          </li>
        </ul>
      </div>
    </div>
    <p v-else>No employees found.</p>

    <div v-if="employeeToUpdate.id" class="update-form">
      <h3>Update Employee</h3>
      <input v-model="employeeToUpdate.name" placeholder="Name" />
      <input v-model="employeeToUpdate.email" placeholder="Email" />
      <input v-model="employeeToUpdate.phone_number" placeholder="Phone" />
      <input v-model="employeeToUpdate.position" placeholder="Position" />
      <input v-model="employeeToUpdate.hire_date" placeholder="Hire Date" />
      <button @click="updateEmployee" class="update-btn">Update Employee</button>
    </div>
  </div>
</template>

<style scoped>
.submit-btn {
  background-color: #8f1616;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #b82626;
}

.update-btn {
    margin-left: 5px;
  background-color: #bebe00;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.update-btn:hover {
  background-color: #e9e949;
}

.employees-container {
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #e0f7fa, #e1bee7);
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

h2 {
  margin-bottom: 20px;
  text-align: center;
  color: #4a148c;
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.employees-list {
  max-height: 500px;
  overflow-y: auto; 
  padding-right: 10px; 
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  background: #ffffff;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

li:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

h3 {
  margin: 0 0 10px;
  font-size: 1.4rem;
  color: #1a237e;
}

p {
  margin: 5px 0;
  font-size: 1rem;
  color: #424242;
  line-height: 1.4;
}

li:nth-child(odd) {
  background: #f3e5f5;
}

li:nth-child(even) {
  background: #e8f5e9;
}

@media (max-width: 768px) {
  .employees-container {
    padding: 10px;
  }

  h2 {
    font-size: 1.5rem;
  }

  li {
    padding: 15px;
  }

  h3 {
    font-size: 1.2rem;
  }

  p {
    font-size: 0.9rem;
  }
}

.update-btn {
  background-color: #156f8f;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.update-btn:hover {
  background-color: #1d86a5;
}

.update-form {
  margin-top: 20px;
}

.update-form input {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>