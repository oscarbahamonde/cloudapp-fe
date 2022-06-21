<script setup lang="ts">
useHead({
  title: 'Todo App',
  meta: [
    { name: 'description', content: 'Todo App' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/logo.svg'
    },
  ],
})
</script>

<template>
  <RouterView />
  <Cognito />
</template>
