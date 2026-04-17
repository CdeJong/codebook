<script setup lang="ts">
import { User } from '@/domains/users/user';
import FormError from '@/services/error/FormError.vue';
import FormMessage from '@/services/error/FormMessage.vue';
import { ref } from 'vue';


const props = defineProps(['user']);
const emit = defineEmits(['submit']);
const form = ref<User>({ ...props.user });

const handleSubmit = () => {
    emit('submit', form.value);
}


</script>

<template>
    <form class="form" @submit.prevent="handleSubmit">
        <FormMessage />

        <label for="first_name">First Name</label>
        <input type="text" id="first_name" v-model="form.first_name" />
        <FormError name="first_name" />

        <label for="last_name">Last Name</label>
        <input type="text" id="last_name" v-model="form.last_name" />
        <FormError name="last_name" />

        <label for="email">Email</label>
        <input type="text" id="last_name" v-model="form.email" />
        <FormError name="email" />

        <label for="phone_number">Phone number</label>
        <input type="text" id="phone_number" v-model="form.phone_number" />
        <FormError name="phone_number" />

        <div class="checkbox-container">
            <input type="checkbox" id="is_admin" v-model="form.is_admin" />
            <label for="is_admin">Administrator Privileges</label>
        </div>
        <FormError name="is_admin" />

        <button class="button" type="submit">Save</button>
    </form>
</template>