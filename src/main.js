import { createApp } from 'vue';
import App from './App.vue';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrimeVue from 'primevue/config';
import router from './router';

import { store} from './store';


createApp(App).use(router).use(PrimeVue).use(store).mount('#app');
