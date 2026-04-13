<script setup lang="ts">
import { closeCurrent } from '.';
import { NoticeDialogData } from '@/services/dialog/types';

const data = defineModel<NoticeDialogData>({ required: true }); 

</script>

<template>
    <div class="dialog" @click.stop>
        <div class="header">{{ data.title }}</div>
        <div class="content">{{ data.description }}</div>
        <div class="footer">
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
}
</style>