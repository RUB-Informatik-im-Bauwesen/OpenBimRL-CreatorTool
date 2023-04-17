<script setup lang="ts"></script>

<template>
  <nav class="w-full fixed p-1 pl-8 bg-gray-300 text-white">
    <ul class="flex gap-4 mt-1">
      <li><a>New</a></li>
      <li>
        <div class="flex gap-1">
          <a>Upload</a>
          <a>Download</a>
        </div>
      </li>
      <li><a class="blue bg-blue-600">Create Nodes</a></li>
      <li><a>Help?</a></li>
    </ul>
  </nav>
</template>

<style scoped>
a {
  @apply block rounded-sm py-1 px-2;
}

a:not(.blue) {
  @apply bg-gray-500;
}
</style>
