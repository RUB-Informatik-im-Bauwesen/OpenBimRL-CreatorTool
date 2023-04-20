<script setup lang="ts">
import Dropdown from "./Dropdown.vue";
</script>

<template>
  <nav class="w-full fixed p-1 pl-8 bg-gray-300 text-white z-10">
    <ul class="flex gap-4 mt-1">
      <li><button class="nav-button">New</button></li>
      <li>
        <div class="flex gap-1">
          <Dropdown>Upload</Dropdown>
          <button class="nav-button">Download</button>
        </div>
      </li>
      <li><button class="blue bg-blue-600 nav-button">Create Nodes</button></li>
      <li><button class="nav-button">Help?</button></li>
    </ul>
  </nav>
</template>

<style>
button.nav-button {
  @apply rounded-sm py-1 px-2;
}

button.nav-button:not(.blue) {
  @apply bg-gray-500;
}
</style>
