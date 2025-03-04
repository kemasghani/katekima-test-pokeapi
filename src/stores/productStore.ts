import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import type { Product } from "@/services/productService";
import { fetchProducts } from "@/services/productService";

export const useProductStore = defineStore("productStore", () => {
  // State
  const products = ref<Product[]>([]);
  const searchQuery = ref(localStorage.getItem("searchQuery") || "");
  const currentPage = ref(Number(localStorage.getItem("currentPage")) || 1);
  const itemsPerPage = ref(Number(localStorage.getItem("itemsPerPage")) || 10);
  const sortOrder = ref<"asc" | "desc">(
    (localStorage.getItem("sortOrder") as "asc" | "desc") || "asc"
  );

  const filteredProducts = computed(() => {
    let result = [...products.value];

    // Filter berdasarkan pencarian
    if (searchQuery.value) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }

    // Sorting nama ASC / DESC
    result.sort((a, b) => {
      return sortOrder.value === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

    return result;
  });

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return filteredProducts.value.slice(start, start + itemsPerPage.value);
  });

  const totalPages = computed(() =>
    Math.ceil(filteredProducts.value.length / itemsPerPage.value)
  );

  // Actions
  const fetchAllProducts = async () => {
    products.value = await fetchProducts();
  };

  const changePage = (page: number) => {
    currentPage.value = page;
  };

  const changeItemsPerPage = (count: number) => {
    itemsPerPage.value = count;
    currentPage.value = 1;
  };

  const changeSearchQuery = (query: string) => {
    searchQuery.value = query;
    currentPage.value = 1;
  };

  const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  };

  // Simpan state ke LocalStorage jika ada perubahan
  watch([currentPage, itemsPerPage, searchQuery, sortOrder], () => {
    localStorage.setItem("currentPage", String(currentPage.value));
    localStorage.setItem("itemsPerPage", String(itemsPerPage.value));
    localStorage.setItem("searchQuery", searchQuery.value);
    localStorage.setItem("sortOrder", sortOrder.value);
  });

  return {
    products,
    searchQuery,
    currentPage,
    itemsPerPage,
    sortOrder,
    filteredProducts,
    paginatedProducts,
    totalPages,
    fetchAllProducts,
    changePage,
    changeItemsPerPage,
    changeSearchQuery,
    toggleSortOrder,
  };
});
