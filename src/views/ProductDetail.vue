<template>
  <div
    class="min-h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600 p-6"
  >
    <!-- Back Button -->
    <button
      @click="goBack"
      class="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transform hover:scale-105 hover:bg-gray-700 transition-all duration-300"
    >
      ⬅️ Back
    </button>
    <div class="flex items-center justify-center">
      <div
        v-if="loading"
        class="text-white text-lg font-semibold animate-pulse"
      >
        Loading Product...
      </div>

      <div
        v-else-if="product"
        class="max-w-lg w-full bg-white/95 backdrop-blur-lg shadow-2xl rounded-xl p-8 border border-gray-200"
      >
        <!-- Product Title -->
        <h1 class="text-4xl font-extrabold text-center text-gray-900 mb-6">
          ⚡ {{ product.name }}
        </h1>

        <div class="flex flex-col items-center space-y-6">
          <!-- Product Details -->
          <div class="w-full text-center">
            <div class="grid grid-cols-2 gap-4 text-gray-800">
              <p class="font-semibold">Firmness:</p>
              <p>{{ product.firmness }}</p>

              <p class="font-semibold">Size:</p>
              <p>{{ product.size }}</p>

              <p class="font-semibold">Growth Time:</p>
              <p>{{ product.growth_time }} days</p>

              <p class="font-semibold">Max Harvest:</p>
              <p>{{ product.max_harvest }}</p>

              <p class="font-semibold">Smoothness:</p>
              <p>{{ product.smoothness }}</p>

              <p class="font-semibold">Soil Dryness:</p>
              <p>{{ product.soil_dryness }}</p>

              <p class="font-semibold">Natural Gift Type:</p>
              <p>{{ product.natural_gift_type }}</p>
            </div>
          </div>

          <!-- Flavors Section -->
          <div class="w-full text-center">
            <h2 class="text-xl font-bold text-gray-900 mb-2">Flavors</h2>
            <div class="flex flex-wrap justify-center gap-2">
              <span
                v-for="flavor in product.flavors"
                :key="flavor.name"
                class="bg-gray-800 text-white px-3 py-1 text-sm font-semibold rounded-lg shadow-md"
              >
                🍓 {{ flavor.name }} ({{ flavor.potency }})
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-white text-lg font-semibold">
        Product not found. ❌
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchProductById } from "@/services/productService";
import type { Product } from "@/services/productService";

const route = useRoute();
const router = useRouter();
const product = ref<Product | null>(null);
const loading = ref(true);

const fetchData = async () => {
  loading.value = true;
  const id = Number(route.params.id);
  product.value = await fetchProductById(id);
  loading.value = false;
};

const goBack = () => {
  router.back();
};

onMounted(fetchData);
</script>
