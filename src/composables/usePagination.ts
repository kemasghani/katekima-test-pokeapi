import { ref, computed } from "vue";
import type { Ref } from "vue";

export function usePagination(filteredProducts: Ref<any[]>) {
  const currentPage = ref(Number(localStorage.getItem("currentPage")) || 1);
  const perPage = ref(Number(localStorage.getItem("perPage")) || 10);

  // Dynamically update total pages based on filtered products
  const totalPages = computed(() =>
    Math.ceil(filteredProducts.value.length / perPage.value)
  );

  const updatePerPage = (value: number) => {
    perPage.value = value;
    currentPage.value = 1; // Reset to first page when perPage changes
    localStorage.setItem("perPage", value.toString());
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      localStorage.setItem("currentPage", currentPage.value.toString());
    }
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
      localStorage.setItem("currentPage", currentPage.value.toString());
    }
  };
  return {
    currentPage,
    perPage,
    totalPages,
    updatePerPage,
    prevPage,
    nextPage,
  };
}
