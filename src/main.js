import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import { createApp } from 'vue'
import App from './App.vue'
import SideNav from './components/SideNav.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import ContentToolbar from './components/ContentToolbar.vue'
import ContentTableData from './components/ContentTableData.vue'

const app = createApp(App)

app.component('app-header', Header)
app.component('app-side-nav', SideNav)
app.component('app-footer', Footer)
app.component('app-content-toolbar', ContentToolbar)
app.component('app-content-table-data', ContentTableData)

app.mount('#app')
