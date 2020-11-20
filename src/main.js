import Vue from "vue";

import App from "./App.vue";
import DataView from "primevue/dataview";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import InputSwitch from "primevue/inputswitch";
import Rating from "primevue/rating";
import ScrollPanel from "primevue/scrollpanel";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import InputNumber from "primevue/inputnumber";
import Calendar from "primevue/calendar";
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import router from "./router";
import VueYouTubeEmbed from "vue-youtube-embed";

Vue.use(VueYouTubeEmbed, { global: true, componentId: "youtube-media" });
Vue.config.productionTip = false;
Vue.use(ToastService);
Vue.component("DataView", DataView);
Vue.component("Toast", Toast);
Vue.component("InputSwitch", InputSwitch);
Vue.component("Rating", Rating);
Vue.component("ScrollPanel", ScrollPanel);
Vue.component("InputText", InputText);
Vue.component("Textarea", Textarea);
Vue.component("InputNumber", InputNumber);
Vue.component("Calendar", Calendar);
Vue.component("MultiSelect", MultiSelect);
Vue.component("Button", Button);
new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
