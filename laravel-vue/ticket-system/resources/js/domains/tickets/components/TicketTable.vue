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
                <!-- <th>Categories</th> -->
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

.table .unassigned {
    color: #888;
}

.categories {
    display: flex;
    flex-wrap: nowrap;
    max-width: 125px;
    overflow: hidden;
    gap: 0.25em;
    position: relative;
}

.category {
    flex: 0 0 auto;
    padding: 0.25em;
    background-color: aqua;
    border-radius: 10%;
}

.categories::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 30px; /* fade width */
  height: 100%;
  pointer-events: none;
  background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
}

.table tbody tr:hover .categories::after {
  background: linear-gradient(to right, rgba(255,255,255,0) 0%, aquamarine 100%);  
}
</style>