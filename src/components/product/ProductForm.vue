<template>
  <form
    @submit.prevent="handleSubmit"
    class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
  >
    <h2 class="text-xl font-semibold text-gray-800">
      {{ isEdit ? "Update Produk" : "Tambah Produk" }}
    </h2>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">Nama Produk</label>
      <input
        v-model="formData.title"
        type="text"
        required
        class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
      />
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">Harga</label>
      <input
        v-model.number="formData.price"
        type="number"
        required
        class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
      />
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">Deskripsi</label>
      <textarea
        v-model="formData.description"
        required
        class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
      ></textarea>
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">Kategori</label>
      <input
        v-model="formData.category"
        type="text"
        required
        class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
      />
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">Gambar</label>
      <input
        type="file"
        @change="handleFileUpload"
        accept="image/*"
        class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
      />
      <p v-if="formData.image" class="text-sm text-gray-600">
        File terpilih: {{ formData.image }}
      </p>
    </div>

    <button
      type="submit"
      class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
    >
      {{ isEdit ? "Update Produk" : "Tambah Produk" }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps({
  product: {
    type: Object,
    default: () => ({
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
    }),
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit"]);
const formData = ref({ ...props.product });

watch(
  () => props.product,
  (newProduct) => {
    formData.value = { ...newProduct };
  },
  { deep: true }
);

const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    formData.value.image = file.name; // Store only the file name
  }
};

const handleSubmit = () => {
  emit("submit", formData.value);
};
</script>
