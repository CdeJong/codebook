<script setup lang="ts">
import { Ticket } from '@/domains/tickets/ticket';
import TicketRow from '@/domains/tickets/components/TicketRow.vue';

const tickets = defineModel<Ticket[]>();

</script>

<template>
    <table class="table">
        <thead>
            <tr>
                <th class="id"></th>
                <th>Title</th>
                <th>Status</th>
                <th>Created By</th>
                <th>Assigned To</th>
                <th></th>
            </tr>
        </thead>
        <tbody v-if="tickets">
            <TicketRow v-for="ticket, index in tickets" :key="ticket.id" v-model="tickets[index]" />
        </tbody>
        <tbody v-else>
            <tr>
                <td></td>
                <td colspan=5>No Tickets found...</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
.table .id {
    min-width: 0;
}

.table tbody tr:hover .categories::after {
  background: linear-gradient(to right, rgba(255,255,255,0) 0%, aquamarine 100%);  
}
</style>