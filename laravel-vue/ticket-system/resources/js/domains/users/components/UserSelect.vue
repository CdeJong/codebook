<script setup lang="ts">
import { User } from '@/domains/users/user';

interface Props {
    users: User[], 
    nullable?: boolean,
    nullText?: string
}

const props = withDefaults(defineProps<Props>(), {
    nullable: false,
    nullText: 'Unset'
});

const users = props.users;
const user_id = defineModel<number | null>();

</script>

<template>
<div class="user-select">
    <label v-if="props.nullable" for="no-user">
        <input id="no-user" type="radio" v-model="user_id" :value="null">
        <div class="value">{{ props.nullText }}</div>
    </label>
    <label v-for="user in users" :key="user.id" :for="'user-' + user.id">
        <input :id="'user-' + user.id" type="radio" v-model="user_id" :value="Number(user.id)">
        <div class="value">{{ user.first_name }} {{ user.last_name }}</div>
    </label>
</div>
</template>

<style scoped>

label input {
    width: 25px;
    margin: 0;
}

label {
    display: flex;
    height: 25px;
    align-items: center;
    user-select: none;
    -webkit-user-select: none;
}

label .value {
    flex-grow: 1;
}

label:hover {
    background-color: blue;
}

</style>