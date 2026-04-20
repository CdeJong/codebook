<script setup lang="ts">
import { categoryStore } from '@/domains/categories/store';
import TicketTable from '@/domains/tickets/components/TicketTable.vue';
import { ticketStore } from '@/domains/tickets/store';
import { userStore } from '@/domains/users/store';
import { showConfirm, showNotice } from '@/services/dialog';

ticketStore.actions.fetchAll();

userStore.actions.fetchAll();
categoryStore.actions.fetchAll();

const tickets = ticketStore.getters.getAll();

const handleConfirm = () => {
    showConfirm(
        "Confirm!", 
        "Are you sure?", 
        () => {console.log("confirm deny")}, 
        () => {console.log("confirm accept")},
        "No",
        "Yes"
    );
}

const handleNotice = () => {
    showNotice(
        "Notice!", 
        "You cannot do that!", 
        () => {console.log("notice close")},
        "Close"
    );
}

</script>

<template>
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Ticket Overview</h1>
            <button class="button" @click.prevent="handleConfirm">Confirm</button>
            <button class="button" @click.prevent="handleNotice">Notice</button>

            <RouterLink class="button" :to="{ name: 'tickets.create'}">Create New Ticket</RouterLink>
        </div>
    </div>

    <TicketTable v-model="tickets" />
</template>