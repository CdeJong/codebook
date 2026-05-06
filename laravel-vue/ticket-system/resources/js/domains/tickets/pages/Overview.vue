<script setup lang="ts">
import { categoryStore } from '@/domains/categories/store';
import TicketTable from '@/domains/tickets/components/TicketTable.vue';
import { ticketStore } from '@/domains/tickets/store';
import { userStore } from '@/domains/users/store';
import { useDialog } from '@/services/dialog';

ticketStore.actions.fetchAll();

userStore.actions.fetchAll();
categoryStore.actions.fetchAll();

const tickets = ticketStore.getters.getAll();

</script>

<template>
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Ticket Overview</h1>

            <RouterLink class="button" :to="{ name: 'tickets.create'}">Create New Ticket</RouterLink>
        </div>
    </div>

    <TicketTable v-model="tickets" />
</template>