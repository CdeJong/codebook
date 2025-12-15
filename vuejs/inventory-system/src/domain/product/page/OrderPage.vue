<script setup lang="ts">
import ProductTable from '@/domain/product/component/ProductTable.vue';
import { getLowProducts } from '@/domain/product/store.ts';
</script>

<template>
  <h1 class="title">Order</h1>
  <ProductTable v-model=getLowProducts />
</template>

<style scoped></style>