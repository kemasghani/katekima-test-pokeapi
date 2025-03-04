<template>
  <div class="p-6 bg-white shadow-md rounded-lg mx-auto">
    <!-- Dropdown untuk memilih produk lain -->
    <div class="mb-4">
      <label
        for="product-select"
        class="block text-sm font-medium text-gray-700"
      >
        Pilih Produk Lain:
      </label>
      <div class="flex gap-2">
        <select
          id="product-select"
          v-model="selectedProductId"
          class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
        >
          <option disabled value="">-- Pilih Produk --</option>
          <option v-for="prod in productList" :key="prod.id" :value="prod.id">
            {{ prod.title }}
          </option>
        </select>
        <button
          @click="changeProduct"
          :disabled="!selectedProductId || loading"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
        >
          Pindah
        </button>
      </div>
    </div>

    <!-- Kartu Produk -->
    <ProductCard :product="product" :loading="loading" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchProductById, fetchProducts } from "@/services/productService";
import ProductCard from "@/components/product/ProductCard.vue";

const route = useRoute();
const router = useRouter();
const product = ref(null);
const productList = ref([]);
const selectedProductId = ref("");
const loading = ref(true);

// Function to fetch product details
const loadProduct = async (id) => {
  loading.value = true;
  try {
    product.value = await fetchProductById(id);
  } catch (error) {
    console.error("Error fetching product:", error);
  } finally {
    loading.value = false;
  }
};

// Fetch initial data when component is mounted
onMounted(async () => {
  productList.value = await fetchProducts();
  selectedProductId.value = route.params.id;
  await loadProduct(route.params.id);
});

// Watch route changes and update data dynamically
watch(
  () => route.params.id,
  async (newId) => {
    selectedProductId.value = newId;
    await loadProduct(newId);
  }
);

// Change product detail dynamically
const changeProduct = () => {
  if (selectedProductId.value) {
    router.push(`/product/${selectedProductId.value}`);
  }
};
</script>
