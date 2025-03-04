<template>
  <div class="mx-auto bg-white shadow-md rounded-lg">
    <ProductForm @submit="handleAddProduct" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import ProductForm from "@/components/product/ProductForm.vue";
import { addProduct } from "@/services/productService";

const router = useRouter();

const handleAddProduct = async (product: any) => {
  try {
    await addProduct(product);
    Swal.fire({
      icon: "success",
      title: "Sukses!",
      text: "Produk berhasil ditambahkan!",
      confirmButtonColor: "#3085d6",
    }).then(() => {
      router.push("/products");
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal!",
      text: "Terjadi kesalahan saat menambahkan produk.",
      confirmButtonColor: "#d33",
    });
  }
};
</script>
