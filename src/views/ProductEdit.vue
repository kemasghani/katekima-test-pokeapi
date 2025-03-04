<template>
  <div class="mx-auto p-6 bg-white shadow-md rounded-lg">
    <ProductForm
      v-if="product"
      :product="product"
      isEdit
      @submit="handleUpdate"
    />
    <div v-else class="text-gray-600">Loading product data...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import { fetchProductById, updateProduct } from "@/services/productService";
import ProductForm from "@/components/product/ProductForm.vue";

const route = useRoute();
const router = useRouter();
const product = ref(null);

onMounted(async () => {
  try {
    const id = route.params.id;
    product.value = await fetchProductById(id);
  } catch (error) {
    console.error("Error fetching product:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to fetch product data!",
    });
  }
});

const handleUpdate = async (updatedProduct) => {
  try {
    await updateProduct(product.value.id, updatedProduct);
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Product updated successfully!",
      confirmButtonColor: "#3085d6",
    }).then(() => {
      router.push("/products");
    });
  } catch (error) {
    console.error("Error updating product:", error);
    Swal.fire({
      icon: "error",
      title: "Update Failed",
      text: "Failed to update product. Please try again.",
    });
  }
};
</script>
