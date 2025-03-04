import { createRouter, createWebHistory } from "vue-router";
import Products from "@/views/Products.vue";
import ProductDetail from "@/views/ProductDetail.vue";

const routes = [
  { path: "/", redirect: "/products" },
  { path: "/products", name: "Products", component: Products },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: ProductDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
