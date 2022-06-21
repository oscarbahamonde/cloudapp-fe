<template>

    <div row> <input type="color" id="color" v-model="primary" w-6 h-6 />
        <input type="color" id="color" v-model="secondary" w-6 h-6 />
        <input type="color" id="color" v-model="accent" w-6 h-6 />
        <input type="color" id="color" v-model="info" w-6 h-6 />
        <input type="color" id="color" v-model="success" w-6 h-6 />
        <input type="color" id="color" v-model="danger" w-6 h-6 />
    </div>
</template>
<script setup lang="ts">
const primary = ref('#00aba9')
const secondary = ref('#00aba9')
const accent = ref('#00aba9')
const info = ref('#00aba9')
const success = ref('#00aba9')
const danger = ref('#00aba9')
</script>