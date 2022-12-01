import * as Vue from 'vue'
import App from './components/App/App.vue'
import * as Tone from 'tone'
import p5 from "p5";

const app = Vue.createApp(App)
app.config.globalProperties.$tone = Tone;
app.config.globalProperties.$p5 = p5;
app.mount('#app')


