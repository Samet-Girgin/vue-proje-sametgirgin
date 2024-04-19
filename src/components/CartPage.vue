<template>
    <div class="container mt-5">
      <h2>Cart</h2>
      <h4 class="mt-4">Total Price: ${{ cartItems.length ? totalPrice : '0' }}</h4>

      <ul class="list-group">
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
          v-for="item in cartItems"
          :key="item.id"
        >
          <div class="item-content">
            <div class="images">
              <img :src="item.image" :alt="item.title" class="item-image" />
            </div>
            <div class="titles">
              <h2 class="item-title">{{ item.title }}</h2>
            </div>
            <div class="item-details">
              <div class="details-row">
                <p class="item-rating">Rating: {{ item.rating.rate }}</p>
                <p class="item-rating">Count: {{ item.quantity }}</p>
              </div>
            </div>
          </div>
          <div class="quantity-buttons">
            <button class="btn btn-secondary" @click="decrementQuantity(item)">-</button>
            <button class="btn btn-secondary" @click="incrementQuantity(item)">+</button>
          </div>
          <span class="badge bg-primary rounded-pill">Price: ${{ item.price * item.quantity }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from "vuex";
  
  export default {
    computed: {
        ...mapGetters(["getCartItems", "getTotalPrice", "isLoggedIn"]),
    cartItems() {
      return this.getCartItems;
    },
      totalPrice() {
        return this.getTotalPrice;
      }
    },
    methods: {
      ...mapActions(["addToCart", "removeFromCart"]),
      incrementQuantity(item) {
        this.addToCart(item);
      },
      decrementQuantity(item) {
        if (item.quantity > 1) {
          this.removeFromCart(item);
        }
        else {
    // If quantity is 1 or less, simply remove the item from the cart
    this.removeFromCart(item);
            }
      }
    },
    mounted() {
      console.log('Cart Items:', this.getCartItems);
      console.log('Total Price:', this.getTotalPrice);
    }
  };
  </script>
  
  
  <style>
  .quantity-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.quantity-buttons button {
  margin: 0.5rem;
}
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
  