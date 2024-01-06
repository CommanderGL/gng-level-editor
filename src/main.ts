import { createApp } from 'vue';
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faArrowRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';

import './styles/index.css';

library.add(faArrowLeft, faArrowRight, faCaretDown);

export const app = createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
