import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from './store/index'
import "./styles/main.scss"
// import { registerSW } from 'virtual:pwa-register'

createApp(App).use(router).use(store).mount('#app')

// const updateSW = registerSW({
//   onNeedRefresh() {
//     console.log("onNeedRefresh");
//   },
//   onOfflineReady() {
//     console.log("onOfflineReady");
//   },
// })

// updateSW()