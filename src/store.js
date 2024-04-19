import { createStore } from 'vuex';






export const store = createStore({
  state: () => ({
    cartItems: [],
    totalPrice: 0,
    isLoggedIn: false,
    
  }),
  mutations: {
    ADD_TO_CART(state, item) {
      const existingItem = state.cartItems.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }

      state.totalPrice += item.price;
    },
    REMOVE_FROM_CART(state, item) {
        const existingItem = state.cartItems.find((i) => i.id === item.id);
      
        if (existingItem && existingItem.quantity > 1) {
          existingItem.quantity--;
          state.totalPrice -= item.price;
        } else {
          state.cartItems = state.cartItems.filter((i) => i.id !== item.id);
          state.totalPrice -= item.price * existingItem.quantity;
        }
      },

      SET_IS_LOGGED_IN(state, value) {
        state.isLoggedIn = value;
      },

  },
  actions: {
    addToCart({ commit }, item) {
      commit("ADD_TO_CART", item);
    },
    removeFromCart({ commit }, item) {
        commit("REMOVE_FROM_CART", item);
      },

      
    },
    
    computed: {
        isLoggedIn() {

            console.log("isLoggedIn getter called");  
          return this.$store.getters.isLoggedIn;
        },
        // other computed properties...
      },

  
  getters: {
    getCartItems: (state) => state.cartItems,
    getTotalPrice: (state) => state.totalPrice,
    isLoggedIn: state => state.isLoggedIn,
  },
  
});
