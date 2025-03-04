<template>
  <div>
    <!-- Mobile Header with Hamburger -->
    <div
      class="md:hidden flex items-center justify-between p-6 bg-gray-900 text-white absolute left-0 top-0"
    >
      <button @click="toggleSidebar">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
    </div>

    <!-- Sidebar menu -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transition-transform transform top-0 h-full',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'md:static md:translate-x-0',
      ]"
    >
      <div class="text-center pt-6">
        <img
          src="@/assets/icon/katekima_logo.jpg"
          alt="Logo"
          class="w-30 mx-auto"
        />
      </div>
      <nav class="mt-5">
        <ul>
          <li>
            <router-link
              to="/products"
              class="block py-3 px-5 text-gray-300 hover:bg-gray-700 transition-all"
              :class="{ 'bg-gray-700': isProductsActive }"
            >
              Products
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Overlay for mobile -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
      @click="toggleSidebar"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const isOpen = ref(false);
const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

const route = useRoute();

// Keep "Products" active for all related routes
const isProductsActive = computed(() => {
  return ["/products", "/product"].some(
    (path) => route.path.startsWith(path)
  );
});
</script>
