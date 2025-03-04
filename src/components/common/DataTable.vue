<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-red-500 to-yellow-400 p-6"
  >
    <div
      class="max-w-5xl w-full bg-white/80 backdrop-blur-lg shadow-2xl rounded-xl p-6 border border-gray-300"
    >
      <h1
        class="text-4xl font-extrabold text-center text-blue-700 mb-6 drop-shadow-lg"
      >
        🏆 Pokémon Berry List 🏆
      </h1>

      <div class="flex justify-between items-center mb-4">
        <input
          v-model="searchQuery"
          @input="updateSearchQuery"
          type="text"
          placeholder="Search berries..."
          class="border p-2 rounded-lg w-64 shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        <select
          v-model="pageSize"
          @change="updatePageSize"
          class="border p-2 rounded-lg"
        >
          <option v-for="size in [10, 30, 50]" :key="size" :value="size">
            {{ size }} per page
          </option>
        </select>
      </div>

      <div v-if="loading" class="flex justify-center items-center py-6">
        <div class="text-lg font-semibold text-gray-700 animate-pulse">
          Fetching Pokémon Berries...
        </div>
      </div>

      <div v-else class="overflow-x-auto">
        <table
          class="w-full border-collapse shadow-lg rounded-xl overflow-hidden"
        >
          <thead>
            <tr
              class="bg-gradient-to-r from-blue-600 to-red-500 text-white text-lg"
            >
              <th class="border p-4">No</th>
              <th class="border p-4 cursor-pointer" @click="toggleSort">
                Name
                <span v-if="sortOrder === 'asc'">⬆️</span>
                <span v-else>⬇️</span>
              </th>
              <th class="border p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(product, index) in paginatedProducts"
              :key="product.id"
              class="odd:bg-yellow-100 even:bg-white hover:bg-yellow-300 transition-all duration-300"
            >
              <td class="border p-4 text-lg font-medium text-gray-800">
                {{ index + 1 + (currentPage - 1) * pageSize }}
              </td>
              <td
                class="border p-4 text-lg font-medium text-gray-800 capitalize"
              >
                {{ product.name }}
              </td>
              <td class="border p-4 text-center">
                <button
                  @click="$emit('edit', product.id)"
                  class="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow-md transform hover:scale-105 hover:bg-blue-800 transition-all duration-300"
                >
                  ⚡ Detail
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-700 text-white rounded-md shadow-md disabled:opacity-50"
        >
          ⬅️ Previous
        </button>
        <span class="text-lg font-semibold"
          >Page {{ currentPage }} of {{ totalPages }}</span
        >
        <button
          @click="nextPage"
          :disabled="currentPage >= totalPages"
          class="px-4 py-2 bg-gray-700 text-white rounded-md shadow-md disabled:opacity-50"
        >
          Next ➡️
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import type { Product } from "@/services/productService";

const props = defineProps<{ products: Product[]; loading: boolean }>();

const searchQuery = ref(localStorage.getItem("searchQuery") || "");
const pageSize = ref(Number(localStorage.getItem("pageSize")) || 10);
const currentPage = ref(Number(localStorage.getItem("currentPage")) || 1);
const sortOrder = ref(localStorage.getItem("sortOrder") || "asc");

const filteredProducts = computed(() => {
  return props.products
    .filter((p) =>
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder.value === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
});

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / pageSize.value)
);

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredProducts.value.slice(start, start + pageSize.value);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    localStorage.setItem("currentPage", String(currentPage.value));
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    localStorage.setItem("currentPage", String(currentPage.value));
  }
};

const toggleSort = () => {
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  localStorage.setItem("sortOrder", sortOrder.value);
};

const updateSearchQuery = () => {
  currentPage.value = 1;
  localStorage.setItem("searchQuery", searchQuery.value);
};

const updatePageSize = () => {
  currentPage.value = 1;
  localStorage.setItem("pageSize", String(pageSize.value));
};

watch([searchQuery, pageSize, sortOrder], () => {
  localStorage.setItem("searchQuery", searchQuery.value);
  localStorage.setItem("pageSize", String(pageSize.value));
  localStorage.setItem("sortOrder", sortOrder.value);
});

onMounted(() => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value || 1;
    localStorage.setItem("currentPage", String(currentPage.value));
  }
});
</script>
