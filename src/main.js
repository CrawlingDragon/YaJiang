import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from '@/http';

import '@/common/css/old_normal.scss';
import '@/common/css/vant_rest.scss';

import './common/css/reseat.styl';
import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';

import VConsole from 'vconsole/dist/vconsole.min.js';

if (import.meta.env.NODE_ENV == 'development') {
  // eslint-disable-next-line no-unused-vars
  // new VConsole();
}

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(router).use(store).use(Vant).use(Lazyload);

app.mount('#app');
// app
