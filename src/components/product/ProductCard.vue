<template>
  <div
    class="relative mx-auto bg-white shadow-xl rounded-2xl overflow-hidden flex gap-10 py-10"
  >
    <!-- Image Section -->
    <div class="w-[40%] flex items-center">
      <div v-if="loading" class="w-full h-80 bg-gray-200 animate-pulse"></div>
      <img
        v-else
        :src="product.image"
        alt="Product Image"
        class="w-full h-80 object-contain bg-gray-100"
      />
      <div
        v-if="!loading"
        class="absolute top-8 right-2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full"
      >
        {{ product.category }}
      </div>
    </div>

    <!-- Text Content -->
    <div class="p-6 space-y-4 w-[60%]">
      <h2
        v-if="loading"
        class="w-3/4 h-8 bg-gray-200 rounded animate-pulse"
      ></h2>
      <h2 v-else class="text-3xl font-extrabold text-gray-900">
        {{ product.title }}
      </h2>

      <p
        v-if="loading"
        class="w-full h-20 bg-gray-200 rounded animate-pulse"
      ></p>
      <p v-else class="text-gray-600 text-lg">{{ product.description }}</p>

      <!-- Price & Rating -->
      <div class="flex items-center justify-between">
        <div v-if="loading" class="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
        <div v-else class="text-lg font-semibold text-green-600">
          ${{ product.price.toFixed(2) }}
        </div>

        <div class="flex items-center">
          <span v-if="loading" class="w-8 h-6 bg-gray-200 rounded animate-pulse"></span>
          <span v-else class="text-yellow-400 text-lg font-bold">
            {{ product.rating.rate }}
          </span>
          <svg
            v-if="!loading"
            class="w-5 h-5 text-yellow-400 ml-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 15.27L16.18 18l-1.64-7.03L18 7.24l-7.19-.61L10 0 9.19 6.63 2 7.24l5.46 3.73L5.82 18z"
            />
          </svg>
          <span v-if="loading" class="w-12 h-6 bg-gray-200 rounded animate-pulse ml-2"></span>
          <span v-else class="text-gray-500 ml-2">
            ({{ product.rating.count }} reviews)
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: Object,
  loading: Boolean,
});
</script>
