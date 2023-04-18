<script setup lang="ts"></script>

<template>
  <nav class="w-full fixed p-1 pl-8 bg-gray-300 text-white">
    <ul class="flex gap-4 mt-1">
      <li><button>New</button></li>
      <li>
        <div class="flex gap-1">
          <button>Upload</button>
          <button>Download</button>
        </div>
      </li>
      <li><button class="blue bg-blue-600">Create Nodes</button></li>
      <li><button>Help?</button></li>
    </ul>
  </nav>
</template>

<style scoped>
button {
  @apply rounded-sm py-1 px-2;
}

button:not(.blue) {
  @apply bg-gray-500;
}
</style>
