import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { fetchProducts, deleteProduct } from "@/services/productService";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const useProductStore = defineStore("product", () => {
  // State
  const products = ref<Product[]>([]);
  const loading = ref<boolean>(true);
  const searchQuery = ref<string>(localStorage.getItem("searchQuery") || "");
  const sortOrder = ref<"asc" | "desc">("asc");

  // Actions
  const fetchAllProducts = async () => {
    loading.value = true;
    try {
      const data = await fetchProducts();
      products.value = data;
    } finally {
      loading.value = false;
    }
  };

  const removeProduct = async (id: number) => {
    try {
      await deleteProduct(id);
      products.value = products.value.filter((p) => p.id !== id);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  // Getters
  const filteredProducts = computed(() => {
    if (!searchQuery.value.trim()) return products.value;
    return products.value.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  return {
    products,
    loading,
    searchQuery,
    sortOrder,
    fetchAllProducts,
    removeProduct,
    filteredProducts,
  };
});
