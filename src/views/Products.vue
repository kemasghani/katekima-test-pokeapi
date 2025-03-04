<template>
  <div class="container mx-auto">
    <DataTable :products="products" :loading="loading" @edit="editProduct" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import DataTable from "@/components/common/DataTable.vue";
import { fetchProducts } from "@/services/productService";
import type { Product } from "@/services/productService";


const products = ref<Product[]>([]);
const loading = ref(true);

const fetchData = async () => {
  loading.value = true;
  products.value = await fetchProducts();
  loading.value = false;
};

onMounted(fetchData);

const editProduct = (id: number) => {
  window.location.href = `/product/${id}`;
};
</script>
