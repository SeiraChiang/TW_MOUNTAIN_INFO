import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia';
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCloudSunRain, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add( faCloudSunRain, faTemperatureHigh );

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon)
const pinia = createPinia();
app.use(pinia); // 安装 Pinia
createApp(App).mount('#app')
