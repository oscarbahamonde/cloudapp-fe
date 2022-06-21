<script setup lang="ts">

import { useDraggable } from '@vueuse/core'
const el = ref<HTMLElement | null>(null)

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 750, y: 300 },
})
</script>

<template>
  <div ref="el" :style="style" style="position: fixed">
   <Icon icon="logos:aws" w-32 h-32 />
  </div>
</template>