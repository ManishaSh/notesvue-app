import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import Kpi from "./components/Kpi.component.vue";
import AddNotesForm from "./components/dialogue.vue";
import TodoList from "./components/TodoList.component.vue";


import "./assets/main.css";

const app = createApp(App);
app.component("kpi-indicators", Kpi);
app.component("add-notes-form", AddNotesForm);
app.component("todo-list", TodoList);


app.use(createPinia());
app.use(router);

app.mount("#app");
