<script setup lang="ts">
import { getMessage } from '@/services/error';

const message = getMessage;
</script>

<template>
    <div class="error" v-if="message">
        {{ message }}
    </div>   
</template>