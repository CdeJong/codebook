<script setup lang="ts">

import { closeCurrent, getCurrentDialog } from '@/services/dialog';

const currentModalData = getCurrentDialog;

</script>



<template>
    <div v-if="currentModalData" class="dialog-background" @click.prevent="closeCurrent">
        <component :is="currentModalData.component" v-model="currentModalData" />
    </div>
</template>

<style scoped>
.dialog-background {
    position: fixed;
    inset: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.30);
    align-content: center;
}
</style>