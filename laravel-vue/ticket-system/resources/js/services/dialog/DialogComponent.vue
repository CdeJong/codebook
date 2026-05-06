<script setup lang="ts">
import { Button } from '@/services/dialog/types';
import { useDialog } from '@/services/dialog';

const dialog = useDialog();
const data = dialog.get();

const handleClick = (button : Button) => {
    if (!button.onClick) {
        dialog.close();
        return;
    }
    button.onClick();
}

const handleClass = (element : {style?: string}) => {
    const cssClass = element.style ?? 'primary';

    return cssClass;
}

</script>

<template>
    <div v-if="data" class="dialog-background" @click.prevent="dialog.close()">
        <div class="dialog" @click.stop>
            <div class="header" :class="handleClass(data)">{{ data.title }}</div>
            <div class="content">{{ data.description }}</div>
            <div class="footer">
                <button class="button" v-for="button, index in data.buttons" :key="index" @click="handleClick(button)" :class="handleClass(button)">{{ button.text }}</button>
            </div>
        </div>
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

.dialog {
    background-color: white;
    width: min(90%, 500px);
    margin: 0 auto;
}

.header {
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

/* .confirm {
    background-color: rgb(90, 233, 90);
}

.confirm:hover {
    background-color: rgb(79, 206, 79);
} */
</style>