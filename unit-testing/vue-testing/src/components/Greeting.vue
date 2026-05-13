<script setup lang="ts">
defineProps<{
    name: string,
    emoji?: string
}>();
</script>

<template>
    <h1>Hello, {{ name }}! <template v-if="emoji">{{ emoji }}</template></h1>
</template>