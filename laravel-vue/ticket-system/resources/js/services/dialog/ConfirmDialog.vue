<script setup lang="ts">
import { closeCurrent, confirmCurrent } from '.';
import { ConfirmDialogData } from './types';

const data = defineModel<ConfirmDialogData>( { required: true }); 

</script>

<template>
    <div class="dialog" @click.stop>
        <div class="header">{{ data.title }}</div>
        <div class="content">{{ data.description }}</div>
        <div class="footer">
            <button ref="closeButton" @click="confirmCurrent" class="button confirm">{{ data.confirmButtonText }}</button>
            <button ref="closeButton" @click="closeCurrent" class="button">{{ data.closeButtonText }}</button>
        </div>
    </div>
</template>

<style scoped>
.dialog {
    background-color: white;
    width: min(90%, 500px);
    margin: 0 auto;
}

.header {
    background-color: rgb(255, 104, 104);
    padding: 0.5em;
}

.content {
    padding: 0.5em;
}

.footer {
    display: flex;
    justify-content: flex-end;
    padding: 0.5em;
    gap: 0.5em;
}

.confirm {
    background-color: rgb(90, 233, 90);
}

.confirm:hover {
    background-color: rgb(79, 206, 79);
}
</style>