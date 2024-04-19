<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-header bg-secondary text-white text-center">
            <h4>Login</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitForm" id="form">
              <div class="mb-3">
                <label for="username" class="form-label">Username:</label>
                <input v-model="formData.username" type="text" class="form-control" id="username" maxlength="10" placeholder="Enter username" required />
                <div v-if="errors.username" class="text-danger mt-1">{{ errors.username }}</div>
              </div>
              
              <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input v-model="formData.password" type="password" class="form-control" id="password" placeholder="Enter password" required />
                <div v-if="errors.password" class="text-danger mt-1">{{ errors.password }}</div>
              </div>
              
              <div class="d-grid gap-2 mt-3">
                <button type="submit" class="btn btn-secondary">Login</button>
              </div>
            </form>

            

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
  import router from "@/router"; // Adjust the path to your router file
  import Localbase from 'localbase';
  import { mapState } from 'vuex';

  export default {
    name: "LoginPage",
    data() {
      return {
        formData: {
          username: "",
          password: "",
        },
        errors: {},
      };
    },
    methods: {
      submitForm() {
        this.errors = {}; // Clear previous errors
        
        // Validate form
        if (!this.formData.username) {
          this.errors.username = "Username is required.";
        }
        
        if (!this.formData.password) {
          this.errors.password = "Password is required.";
        }
        
        // If no errors, check credentials
        if (Object.keys(this.errors).length === 0) {
          this.checkCredentials();
        }
      },
      checkCredentials() {
      // Initialize localbase
      const db = new Localbase('db');
      
      // Query localbase for the user with the given username
      db.collection('users').doc(this.formData.username).get().then(user => {
        if (user) {
          // Check password
          if (this.formData.password === user.password) { // Assuming password is stored in user object
            console.log("Login successful!");
            // Navigate to the home page or perform other actions
            router.push({path:"/home" });
            this.$store.commit('SET_IS_LOGGED_IN', true);
            this.$forceUpdate();
            console.log("is_logged_in:", this.$store.state.isLoggedIn);
          } else {
            this.errors.password = "Invalid username or password.";
          }
        } else {
          this.errors.username = "User does not exist.";
        }
      });
    },
  },

  computed: {
    ...mapState(['is_logged_in',]),
  },

};
</script>
  


<style scoped>
/* Add any custom styles here */
.card {
  border: none;
}

.card-header {
  border-radius: 0.25rem 0.25rem 0 0;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #5a6268;
}
</style>