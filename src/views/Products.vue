<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Daftar Produk</h1>
      <button
        @click="$router.push('/product-add')"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
      >
        + Tambah Produk
      </button>
    </div>
    <DataTable
      :products="products"
      :loading="loading"
      @edit="editProduct"
      @delete="deleteProduct"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import DataTable from "@/components/common/DataTable.vue";
import { fetchProducts, deleteProduct } from "@/services/productService";

const products = ref([]);
const loading = ref(true);

const fetchData = async () => {
  loading.value = true;
  products.value = await fetchProducts();
  loading.value = false;
};

onMounted(fetchData);

const editProduct = (id: number) => {
  window.location.href = `/product-edit/${id}`;
};

const deleteProductById = async (id: number) => {
  await deleteProduct(id);
  fetchData();
};
</script>
