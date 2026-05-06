<script setup lang="ts">
import { useDialog } from '@/services/dialog';
import FormError from '@/services/error/FormError.vue';
import { getRequest, postRequest, putRequest } from '@/services/http';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const requestForm = ref({email: ''});
const resetForm = ref({password: '', password_confirmation: ''});

const route = useRoute();
const router = useRouter();
const dialog = useDialog();
const public_id = route.query.public_id; 
const token = route.query.token;

const isValid = ref(false);

const handlePasswordResetRequest = async () => {
     try {
        await postRequest('reset-password', requestForm.value);
        dialog.show({ 
            title: 'Password reset requested', 
            description: 'A password reset request was send to your mailbox!',
            buttons: [{ text: 'Ok' }],
        });
    } catch (error) {
        console.log('handlePasswordResetRequest', error);
    }
}

const handlePasswordReset = async () => {
    try {
        await putRequest('reset-password', { 
            ...resetForm.value, 
            public_id: public_id, 
            token: token 
        });
        dialog.show({ 
            title: 'Password updated!', 
            description: 'Try to login with your new password!',
            buttons: [{ text: 'Ok' }]
        });
        router.push({name: 'auth.login'});
    } catch (error) {
        console.log('handlePasswordReset', error);
    }    
}

onMounted(async () => {
    if (public_id === undefined || token === undefined) {
        return;
    }

    try {
        await getRequest('reset-password?public_id=' + public_id + '&token=' + token);
    } catch (error) {
        dialog.show({ 
            title: 'Invalid or expired password reset request!', 
            description: 'The password reset request link you used is invalid or expired, please create a new request!',
            buttons: [{ text: 'Ok' }],
            style: 'danger'
        });
        router.push({ name: 'auth.password-reset'}); // remove faulty query values
        return;
    }

    isValid.value = true;
});


</script>

<template>
<div class="content-header">
    <div class="primary-header">
        <h1 class="title">Password Recovery</h1>
    </div>
</div>

<template v-if="isValid">
    <div class="page-content">
        <p>Please choose a new password!</p>
    </div>

    <form class="form" @submit.prevent="handlePasswordReset">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="resetForm.password">
        <FormError name="password" />

        <label for="password-confirm">Confirm Password:</label>
        <input type="password" id="password-confirm" v-model="resetForm.password_confirmation">
        <FormError name="password-confirm" />
        <button class="button">Change Password</button>
    </form>
</template>
<template v-else>
    <div class="page-content">
        <p>Did you forget your password? No worries request a password recorvery below! Use the email connected to your account!</p>
    </div>

    <form class="form" @submit.prevent="handlePasswordResetRequest">
        <label for="email">Email:</label>
        <input type="email" v-model="requestForm.email" id="email">
        <FormError name="email" />
        <button class="button">Request</button>
    </form>
</template>

</template>