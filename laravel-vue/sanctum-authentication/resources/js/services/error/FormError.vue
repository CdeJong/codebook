<script setup lang="ts">
import { getErrorByProperty } from '@/services/error';

const props = defineProps<{ name: string }>();

const errors = getErrorByProperty(props.name);
</script>

<template>
    <div class="error-list" v-if="errors">
        <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
    </div>   
</template>