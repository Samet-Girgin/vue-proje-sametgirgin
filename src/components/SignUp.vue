<template>
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-md-6">
          <div class="card shadow">
            <div class="card-header bg-primary text-white text-center">
              <h4 class="baslik">Sign Up</h4>
            </div>
            <div class="card-body">
              <form @submit.prevent="submitForm" id="form">
                <div class="mb-3">
                  <label for="username" class="form-label">Username:</label>
                  <input v-model="formData.username" type="text" class="form-control" id="username" maxlength="10" placeholder="Enter username" required />
                  <div v-if="errors.username" class="text-danger mt-1">{{ errors.username }}</div>
                </div>
                
                <div class="mb-3">
                  <label for="email" class="form-label">Email:</label>
                  <input v-model="formData.email" type="email" class="form-control" id="email" placeholder="Enter email" required />
                  <div v-if="errors.email" class="text-danger mt-1">{{ errors.email }}</div>
                </div>
                
                <div class="mb-3">
                  <label for="password" class="form-label">Password:</label>
                  <input v-model="formData.password" type="password" class="form-control" id="password" placeholder="Enter password" required />
                  <div v-if="errors.password" class="text-danger mt-1">{{ errors.password }}</div>
                </div>
                
                <div class="mb-3">
                  <label for="repassword" class="form-label">Confirm Password:</label>
                  <input v-model="formData.repassword" type="password" class="form-control" id="repassword" placeholder="Confirm password" required />
                  <div v-if="errors.repassword" class="text-danger mt-1">{{ errors.repassword }}</div>
                </div>
                
                <div class="mb-3">
                  <label for="phone" class="form-label">Phone:</label>
                  <input v-model="formData.phone" type="tel" class="form-control" id="phone" placeholder="Enter phone number" required />
                  <div v-if="errors.phone" class="text-danger mt-1">{{ errors.phone }}</div>
                </div>
                
                <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
                  {{ successMessage }}
                </div>
                
                <div class="d-grid gap-2 mt-3">
                  <button type="submit" class="btn btn-primary">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
import Localbase from 'localbase';
import router from "@/router"; // Adjust the path to your router file

export default {
  name: "SignUp",
  data() {
    return {
      formData: {
        username: "",
        email: "",
        password: "",
        repassword: "",
        phone: "",
      },
      errors: {},
      successMessage: "",
    };
  },
  methods: {
    submitForm() {
  this.errors = {}; // Clear previous errors
  this.successMessage = "";
  
  // Validate form
  if (!this.formData.username) {
    this.errors.username = "Username is required.";
  } else if (!this.isUsernameValid(this.formData.username)) {
    this.errors.username = "Username should be between 3 and 10 characters and can only contain letters, numbers, underscores, and hyphens.";
  }
  
  if (!this.formData.email) {
    this.errors.email = "Email is required.";
  } else if (!this.validateEmail(this.formData.email)) {
    this.errors.email = "Invalid email format.";
  }
  
  if (!this.formData.password) {
    this.errors.password = "Password is required.";
  } else if (!this.isPasswordValid(this.formData.password)) {
    this.errors.password = "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.";
  } else if (this.formData.password !== this.formData.repassword) {
    this.errors.repassword = "Passwords do not match.";
  }
  
  if (!this.formData.phone) {
    this.errors.phone = "Phone number is required.";
  } else if (!this.isPhoneValid(this.formData.phone)) {
    this.errors.phone = "Phone number should be 10 digits long and contain only numeric characters.";
  }
  
  // If no errors, save data to localStorage
  if (Object.keys(this.errors).length === 0) {
    this.checkUserExists();
  }
},
isUsernameValid(username) {
  const re = /^[a-zA-Z0-9_-]{3,10}$/;
  return re.test(username);
},
isPasswordValid(password) {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  return re.test(password);
},
isPhoneValid(phone) {
  const re = /^\d{10}$/;
  return re.test(phone);
},

    checkUserExists() {
      const db = new Localbase('db');
      
      // Check if username or email already exists
      db.collection('users')
        .doc(this.formData.username)
        .get()
        .then(user => {
          if (user) {
            this.errors.username = "Username already exists.";
          } else {
            db.collection('users')
              .doc(this.formData.email)
              .get()
              .then(user => {
                if (user) {
                  this.errors.email = "Email already exists.";
                } else {
                  this.saveUserData();
                  this.successMessage = "Successfully signed up!";
                  console.log("Form submitted successfully!");
                  router.push({ path: "/login" });
                }
              });
          }
        });
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
//I store data in indexedDB
saveUserData() {
  const db = new Localbase('db');
  
  const userData = {
    email: this.formData.email,
    password: this.formData.password,
    phone: this.formData.phone,
  };

  // Use username as the key
  const usernameKey = this.formData.username;

  // Add userData to localbase with username as the key
  db.collection('users').doc(usernameKey).set(userData);
  
  console.log("User data saved to localbase with key:", usernameKey, "Data:", userData);
},
    fetchUserData() {
  const db = new Localbase('db');

  // Fetch user data based on the username
  const usernameKey = this.formData.username;
  db.collection('users').doc(usernameKey).get().then(user => {
    if (user) {
      console.log("Fetched user data from localbase:", user);
      console.log("Key used for fetching:", usernameKey);
    } else {
      console.log("User not found in localbase.");
      console.log("Key used for fetching:", usernameKey);
    }
  }).catch(error => {
    console.error("Error fetching user data:", error);
  });
},


  },
};
</script>

  
<style scoped>
/* Add any custom styles here */
.card {
  border: none;
}
.baslik{
    background-color: #6c757d;
    border-color: #6c757d;
}
.card-header {
  border-radius: 0.25rem 0.25rem 0 0;
}

.btn-primary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-primary:hover {
  background-color:#6c757d;
  border-color: #6c757d;
}

.alert-success {
  border-radius: 0.25rem;
}
</style>