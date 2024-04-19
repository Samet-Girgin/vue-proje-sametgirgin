<template>
     <div class="d-flex flex-column min-vh-100">
    <h1 class="baslik">E-commerce Store</h1>
    <div class="flex-grow-1">
      <div class="items-container">
        <div class="grid">
          <div v-for="item in items" :key="item.id" class="item">
            <div class="item-content">
              <div class="images">
                <img :src="item.image" :alt="item.title" class="item-image" />
              </div>
              <div class="titles">
                <h2 class="item-title">{{ item.title }}</h2>
              </div>
              <div class="item-details">
                <div class="details-row">
                  <p class="item-price">Price: ${{ item.price }}</p>
                </div>
                <div class="details-row">
                  <p class="item-rating">Rating: {{ item.rating.rate }}</p>
                  <p class="item-rating">Count: {{ item.rating.count }}</p>
                </div>
              </div>
              <div class="item-info">
                <p class="item-description">{{ item.description }}</p>
              </div>
            </div>
            
            <div class="item-actions">
              <button v-if="isLoggedIn" class="btn" @click="addToCart(item)">Add to Cart</button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-space"></div>

  <!-- Footer Section -->
  <footer class="footer">
    <div class="container">
      <p>&copy; 2024 TechEcommerce. All Rights Reserved.</p>
    </div>
  </footer>
</template>

  <style>
   .footer-space {
    flex-grow: 1;
  }

  .footer {
    background-color: #333;
    color: white;
    padding: 1rem;
    text-align: center;
  }

  .baslik {
    align-self: flex-start;
  }
  .items-container {
    display: flex;
    justify-content: space-evenly;  
}

.images,
.item-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 200px; /* Set a minimum height */
}
    
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4%; /* Increased gap between columns */
  justify-content: center;
}
  
  .item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
  
  .item-image {
    width: 100%;
    max-height: 150px;
    object-fit: contain;
  }
  
  .item-title {
    font-size: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: #333;
    text-align: center;
  }
  .titles {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center; /* Center the titles horizontally */
  width: 100%; /* Make sure it takes the full width */
}
  
  .item-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  width: 100%;
}

.details-row {
  width: 100%;  
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-price,
.item-rating {
  margin-bottom: 0.5rem;
  margin-right: 1rem; /* Add margin to create space between items */
}

.item-rating + .item-rating {
  margin-left: 1rem; /* Add margin to the second rating to create space between them */
}

  
.item-info {
  display: none;
  
  position: absolute;
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
  
.item:hover .item-info {
  display: block;
  background: #5f5e5e;
}
  .item-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto; /* Set a fixed height */
}
  .item-description,
  .item-price,
  .item-rating {
    margin-bottom: 0.5rem;
    color: #000000;
    text-decoration-color: #333;
    font-style: oblique;
    font-weight: bold;
  }
  .item-description {
  margin-bottom: 0; /* Reduce margin */
  color: #000000;
  text-decoration-color: #333;
  font-style: oblique;
  font-weight: bold;
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
  </style>
  
  <script>

  import CommerceDataService from "@/services/CommerceDataService"
  import { mapActions, mapGetters } from "vuex";
  export default {
    name: "item-list",
    data() {
      return {
        items: [],
        guncelItem: null,
        guncelIndex: -1,
        aranacakKelime: ''
      };
    },
    computed: {
    ...mapGetters(["isLoggedIn"])
  },
    methods: {
      itemGetir() {
        CommerceDataService.fetchGet()
          .then(gelenItems => {
            this.items = gelenItems.slice(0,19);
            console.log(gelenItems);
            console.log("fetch deneme")
          })
          .catch(hata => {
            console.error(hata);
          });
      },
      aktifTutorial(item, index) {
        console.log("selected item:",item);
        this.guncelItem = item;
        this.guncelIndex = index;
      },
      ...mapActions(["addToCart"]), // Vuex action
      basligaGoreAra() {
        CommerceDataService.findByTitle(this.aranacakKelime)
          .then(aramaSonucuGelenItems => {
            this.items = aramaSonucuGelenItems.data;
          })
          .catch(hata => {
            console.log("hata oluştu :" + hata);
          });
      },
      refresh() {
        this.itemGetir();
      },

      addToCart(item) {
        console.log('Item:', item);
  if (item && item.id) {
    console.log("Adding to cart:", item);
    this.$store.dispatch('addToCart', item);
  } else {
    console.error('Invalid item or item id:', item);
  }
},
  },
    mounted() {
      this.itemGetir();
    }
  };
  </script>