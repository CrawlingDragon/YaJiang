import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from '@/http';
// import "./registerServiceWorker";

import '@/common/css/reseat.styl';
import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';
// import { Dialog } from "vant";
import VConsole from 'vconsole/dist/vconsole.min.js';

if (process.env.NODE_ENV == 'development') {
  // eslint-disable-next-line no-unused-vars
  new VConsole();
}

import { createMetaManager, plugin as vueMetaPlugin } from 'vue-meta';

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app
  .use(router)
  .use(store)
  .use(Vant)
  .use(Lazyload)
  .use(createMetaManager())
  .use(vueMetaPlugin);

app.mount('#app');
// app
