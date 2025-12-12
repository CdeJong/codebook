<script setup lang="ts">
import ProductTable from '@/domain/product/component/ProductTable.vue';	
import { getProducts } from '@/domain/product/store.ts';
</script>

<template>
    <h1 class="title">Overview</h1>
    <ProductTable v-model="getProducts" />
</template>

<style scoped></style>