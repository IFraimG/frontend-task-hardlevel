import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue"
import Project from "@/views/Project.vue"

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home
  },
  {
    name: "Project",
    path: "/:projectID",
    component: Project
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router