import { createApp } from 'vue';
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import './styles/index.css';

library.add(faMinus, faPlus);

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
