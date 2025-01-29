<script setup>
import { ref } from 'vue';
import { useEmployeeStore } from '@/stores/employee';
import { useRoute } from 'vue-router';
import ShowEmployeesView from './ShowEmployeesView.vue';

const route = useRoute();
const companyId = route.params.id; // "22" az URL-ből

const employeeStore = useEmployeeStore();
const employee = ref({
  name: '',
  email: '',
  phone_number: '',
  position: '',
  hire_date: '',
});
const errors = ref({});
const successMessage = ref('');

const handleAddEmployee = async () => {
  const isSuccess = await employeeStore.addEmployee(employee.value, companyId);

  if (!isSuccess) {
    errors.value = { ...employeeStore.errors };
    successMessage.value = '';
  } else {
    employee.value = {
      name: '',
      email: '',
      phone_number: '',
      position: '',
      hire_date: '',
    };
    errors.value = {};
    successMessage.value = 'Employee added successfully!';
  }
};



</script>

<template>
  <div class="employee-form-container">
    <h2>Add New Employee</h2>
    <form @submit.prevent="handleAddEmployee" class="employee-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input 
          v-model="employee.name" 
          type="text" 
          id="name" 
          placeholder="Enter full name" 
          required 
          :class="{ 'invalid': errors.name }" 
        />
        <p v-if="errors.name" class="error">{{ errors.name }}</p>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input 
          v-model="employee.email" 
          type="email" 
          id="email" 
          placeholder="Enter email address" 
          required 
          :class="{ 'invalid': errors.email }" 
        />
        <p v-if="errors.email" class="error">{{ errors.email }}</p>
      </div>

      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input 
          v-model="employee.phone_number" 
          type="text" 
          id="phone" 
          placeholder="e.g., +36301234567 or 06301234567" 
          required 
          :class="{ 'invalid': errors.phone_number }" 
        />
        <p v-if="errors.phone_number" class="error">{{ errors.phone_number }}</p>
      </div>

      <div class="form-group">
        <label for="position">Position</label>
        <input 
          v-model="employee.position" 
          type="text" 
          id="position" 
          placeholder="Enter position" 
          required 
          :class="{ 'invalid': errors.position }" 
        />
        <p v-if="errors.position" class="error">{{ errors.position }}</p>
      </div>

      <div class="form-group">
        <label for="hire_date">Hire Date</label>
        <input 
          v-model="employee.hire_date" 
          type="date" 
          id="hire_date" 
          required 
          :class="{ 'invalid': errors.hire_date }" 
        />
        <p v-if="errors.hire_date" class="error">{{ errors.hire_date }}</p>
      </div>

      <button type="submit" class="submit-btn">Add Employee</button>

      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </form>
  </div>

  <ShowEmployeesView />
</template>

<style scoped>
.employee-form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fdfdfd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  margin-top: 10px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.employee-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

input.invalid {
  border-color: red;
  background-color: #ffe6e6;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.success {
  text-align: center;
  color: green;
  margin-top: 15px;
  font-weight: bold;
}

.submit-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #45a049;
}

@media (max-width: 768px) {
  .employee-form-container {
    padding: 15px;
  }

  input {
    font-size: 14px;
  }

  .submit-btn {
    font-size: 14px;
    padding: 10px;
  }
}
</style>