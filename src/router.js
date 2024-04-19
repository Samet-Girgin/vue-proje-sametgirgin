import { createWebHistory,createRouter } from "vue-router";
const routes = [
    {
      path : "/",
      alias: "/home",
      name: "home",
      component : ()=> import("./components/HomePage")
    },
    {
        path : "/about",
        name : "about",
        component : ()=> import("./components/AboutPage")
    },
    {
        path : "/home/:id",
        name : "item-details",
        component : ()=> import("./components/ItemDetail")
    },
    {
        path : "/login",
        name : "login",
        component : ()=> import("./components/LoginPage")
    },
    {
        path : "/signup",
        name : "signup",
        component : ()=> import("./components/SignUp")
    },
    {
        path : "/cart",
        name : "cart",
        component : ()=> import("./components/CartPage")
    },
    

];
const router = createRouter({
    history : createWebHistory(),
    routes
});
export default router;