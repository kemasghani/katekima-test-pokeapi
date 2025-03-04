import { createRouter, createWebHistory } from "vue-router";
import Products from "@/views/Products.vue";
import ProductAdd from "@/views/ProductAdd.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import ProductEdit from "@/views/ProductEdit.vue";

const routes = [
  { path: "/", redirect: "/products" },
  { path: "/products", name: "Products", component: Products },
  { path: "/product-add", name: "ProductAdd", component: ProductAdd },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: ProductDetail,
    props: true,
  },
  {
    path: "/product-edit/:id",
    name: "ProductEdit",
    component: ProductEdit,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
