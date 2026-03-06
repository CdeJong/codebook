<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { destroyMessage, getMessage } from '@/services/error';

const message = getMessage;

const close = () => {
    destroyMessage();
};

// const closeButton = ref<HTMLButtonElement | null>(null);

// watch(message, async (value) => {
//   if (value) {
//     await nextTick();
//     closeButton.value?.focus();
//   } else {
//     closeButton.value?.blur();
//   }
// });

</script>

<template>
<div class="popup-background" @click="close" v-if="message">
    <div class="popup" @click.stop>
        <div class="header">Oops! Something went wrong!</div>
        <div class="content">{{ message }}</div>
        <div class="footer">
            <button ref="closeButton" @click="close" class="button">Close</button>
        </div>
    </div>   
</div>    

</template>

<style scoped>
.popup-background {
    position: fixed;
    inset: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.30);
    align-content: center;

}

.popup {
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