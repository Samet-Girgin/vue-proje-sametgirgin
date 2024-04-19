<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <img src="@/assets/navlogo.jpg" alt="Logo" class="navbar-logo bg-dark" width="50" height="50" style="margin-right: 10px;" />
      <router-link to="/" class="navbar-brand">TechEcommerce</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/about" class="nav-link">About</router-link>
        </li>
      </div>
      <div class="input-group">
        <input type="text" class="form-control" v-model="aranacakKelime" placeholder="Search items" @keyup.enter="basligaGoreAra">
        <button class="btn btn-outline-secondary" type="button" @click="basligaGoreAra">Search</button>
      </div>

      <b-button-group class="btn-categories">
  <b-button 
    variant="outline-secondary" 
    size="sm" 
    @click="filterByCategory('men\'s clothing')"
    style="padding: 5px 10px; font-size: 12px;"
  >
    Men's Clothing
  </b-button>
  <b-button 
    variant="outline-secondary" 
    size="sm" 
    @click="filterByCategory('women\'s clothing')"
    style="padding: 5px 10px; font-size: 12px;"
  >
    Women's Clothing
  </b-button>
  <b-button 
    variant="outline-secondary" 
    size="sm" 
    @click="filterByCategory('jewelery')"
    style="padding: 5px 10px; font-size: 12px;"
  >
    Jewelery
  </b-button>
  <b-button 
    variant="outline-secondary" 
    size="sm" 
    @click="filterByCategory('electronics')"
    style="padding: 5px 10px; font-size: 12px;"
  >
    Electronics
  </b-button>
</b-button-group>

      <div class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Log in</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/signup" class="nav-link">Sign up</router-link>
        </li>
        <li class="nav-item ms-auto" style="flex: 1;">
          <router-link to="/cart" class="nav-link" style="flex: 1;">Cart</router-link>
        </li>
      </div>
    </nav>

    <!-- Search Results Section -->
    <div class="container mt-3" v-if="searchResults.length > 0">
      <h3>Search Results</h3>
      <ul class="list-group">
        <li class="list-group-item" v-for="item in searchResults" :key="item.id">
          <!-- Display item details here -->


<div class="item-content d-flex align-items-center flex-column flex-md-row">
    <div class="images mb-3 mb-md-0 mr-md-3" @click="toggleDescription(item.id)">
        <img :src="item.image" :alt="item.title" class="item-image rounded" />
    </div>
    <div class="titles text-center text-md-left">
        <h5 class="item-title mb-0">{{ item.title }} </h5>
        <div class="d-flex justify-content-between align-items-center">
            <p class="item-price mb-0">Price: ${{ item.price }}</p>
            <p class="item-rating mb-0">Rating: {{ item.rating.rate }} ({{ item.rating.count }} reviews)</p>
        </div>
        <div class="item-info" :class="{ 'active': activeDescription === item.id }">
            <p class="item-description">{{ item.description }}</p>
        </div>
    </div>
    <div class="item-actions">
        <button v-if="isLoggedIn" class="btn" @click="addToCart(item)">Add to Cart</button>
    </div>
</div>
</li>
</ul>
</div>

<!-- Category Results Section -->
<div class="container mt-3" v-if="categoryResults.length > 0">
      <h3>Category Results</h3>
      <ul class="list-group">
        <li class="list-group-item" v-for="item in categoryResults" :key="item.id">
          <!-- Display item details here -->
          <!-- ...existing item details code... -->
          <div class="item-content d-flex align-items-center flex-column flex-md-row">
    <div class="images mb-3 mb-md-0 mr-md-3" @click="toggleDescription(item.id)">
        <img :src="item.image" :alt="item.title" class="item-image rounded" />
    </div>
    <div class="titles text-center text-md-left">
        <h5 class="item-title mb-0">{{ item.title }} </h5>
        <div class="d-flex justify-content-between align-items-center">
            <p class="item-price mb-0">Price: ${{ item.price }}</p>
            <p class="item-rating mb-0">Rating: {{ item.rating.rate }} ({{ item.rating.count }} reviews)</p>
        </div>
        <div class="item-info" :class="{ 'active': activeDescription === item.id }">
            <p class="item-description">{{ item.description }}</p>
        </div>
    </div>
    <div class="item-actions">
        <button v-if="isLoggedIn" class="btn" @click="addToCart(item)">Add to Cart</button>
    </div>
</div>


        </li>
      </ul>
    </div>



    <div class="container mt-5 mb-5 pb-5"> <!-- Added pb-5 for bottom padding -->
      <RouterView/>
    </div>

    <!-- Footer Section -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 TechEcommerce. All Rights Reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import CommerceDataService from "@/services/CommerceDataService";
import { mapGetters } from "vuex";
export default {
  name: "app",
  data() {
    return {
      aranacakKelime: '',
      searchResults: [], // To store search results
      categoryResults: [], // To store category results
      activeDescription: null,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
    basligaGoreAra() {
  // Check if the search input is empty
  if (!this.aranacakKelime.trim()) {
    this.clearSearchResults();
    return;
  }

  CommerceDataService.fetchGet() // Assuming fetchGet returns all items
    .then(gelenItems => {
      // Filter items based on the title
      this.searchResults = gelenItems.filter(item => item.title.toLowerCase().includes(this.aranacakKelime.toLowerCase()));
    })
    .catch(hata => {
      console.log("hata oluştu :" + hata);
    });
},
addToCart(item) {
      this.$store.dispatch('addToCart', item);
    },

    filterByCategory(category) {
      CommerceDataService.fetchGet() // Assuming fetchGet returns all items
        .then(gelenItems => {
          // Filter items based on the category
          this.categoryResults = gelenItems.filter(item => item.category === category);
        })
        .catch(hata => {
          console.log("hata oluştu :" + hata);
        });
    },

    toggleDescription(itemId) {
      if (this.activeDescription === itemId) {
        this.activeDescription = null;
      } else {
        this.activeDescription = itemId;
      }
    },
    clearSearchResults() {
      this.searchResults = [];
    },
   
  },
  created() {
    // Clear search results when leaving the current route
    this.$router.beforeEach((to, from, next) => {
      if (to.name !== '/home' || to.name !== '/cart') { // Replace 'YourSearchRouteName' with the name of your search route
        this.clearSearchResults();
        this.categoryResults = [];
      }
      next();
    });
  }
};
</script>
<style>
.item-info {
  display: none;
  
  position: left;
  transform: translateX(-50%);
  background-color: #84b0cfc6;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(79, 83, 80, 0.923);
  z-index: 1;
  width: 300px;
  max-height: 100px;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.item-info.active {
  display: block;
} 
.item:hover .item-info {
  display: block;
  background: #5f5e5e;
}
.btn-categories{
  background-color: aquamarine;
  color:#333;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
}
.btn {
    background-color: #009af9fc;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn:hover {
    background-color: #e3b11c;
  }
.images,
.item-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item-image {
  width: 100px;
  height: auto;
}

.item-title {
  font-size: 0.9rem; /* Reduced font size for item titles */
  margin-bottom: 0.5rem;
  padding: 10px;
}

.item-price,
.item-rating {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.item-details {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
/* ...existing styles... */
.d-flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.min-vh-100 {
  min-height: 100vh;
}

.flex-grow-1 {
  flex-grow: 1;
}

.footer {
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
}

.mt-auto {
  margin-top: auto;
}

.mb-5 {
  margin-bottom: 3rem; /* Adjust this value as needed */
}

.pb-5 {
  padding-bottom: 3rem; /* Adjust this value as needed */
}
</style>