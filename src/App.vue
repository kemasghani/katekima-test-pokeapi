<template>
  <div id="app" class="flex h-screen border">
    <Sidebar />
    <div class="flex flex-col w-full">
      <Header />
      <div class="p-6 max-h-[70%] md:max-h-[90%] overflow-y-auto">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/common/Header.vue";
import Sidebar from "@/components/common/Sidebar.vue";
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  overflow-y: hidden;
}
button {
  cursor: pointer;
}
</style>
