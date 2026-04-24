<script setup lang="ts">
import { ticketStore } from '@/domains/tickets/store';
import { userStore } from '@/domains/users/store';
import { categoryStore } from '@/domains/categories/store';
import TicketForm from '@/domains/tickets/components/TicketForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { Ticket } from '@/domains/tickets/ticket';

const router = useRouter();
const route = useRoute();
const id = +route.params.id;

onMounted(async () => {
    if (isNaN(id)) {
        router.replace({ name: 'notfound' });
        return;
    }

    try {
        await ticketStore.actions.fetchById(id);
        await Promise.all([
            userStore.actions.fetchAll(),
            categoryStore.actions.fetchAll()
        ]);
    } catch (error) {
        router.replace({ name: 'notfound' });
    }
});

const ticket = ticketStore.getters.getById(id);

const handleSubmit = async (data : Ticket) : Promise<void> => {
    const updatedTicket = await ticketStore.actions.update(id, data);
    if (updatedTicket !== undefined) {
        router.push({name: 'tickets.show', params: { id: id } });
    }
};

</script>

<template>
<template v-if="ticket">
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Edit Ticket: {{ ticket.title }}</h1>
        </div>
    </div>

    <TicketForm :ticket="ticket" @submit="handleSubmit" />    
</template>
    
</template>