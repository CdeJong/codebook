<script setup>
import { ref } from "vue";

import ScoreTable from '@/components/ScoreTable.vue';
import ThrownDice from '@/components/ThrownDice.vue';

const dice = ref([]);

</script>

<template>
  <ThrownDice v-model="dice" />
  <ScoreTable v-model="dice" />
</template>

<style scoped></style>
