import './assets/main.css';
import './assets/variables.css';

import { createApp } from 'vue'
import Lara from '@/presets/lara'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastService);
app.use(PrimeVue, {
    unstyled: true,
    pt: Lara 
});

app.mount('#app')
