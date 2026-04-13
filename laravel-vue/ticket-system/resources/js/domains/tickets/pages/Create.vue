<script setup lang="ts">
import TicketForm from '@/domains/tickets/components/TicketForm.vue';
import { ref } from 'vue';
import { Ticket } from '@/domains/tickets/ticket';
import { useRouter } from 'vue-router';
import { ticketStore } from '@/domains/tickets/store';

const router = useRouter();

const ticket = ref<Ticket>({
    title: '',
    content: '',
    category_ids: [], // todo might need to change this to ids?

    // not important for form atm
    id: 0,
    user_id: 0,
    assigned_user_id: 0,
    status: '',
    created_at: '',
    updated_at: '',
    notes: [],
    comments: [],
});

const handleSubmit = async (data : Ticket) : Promise<void> => {
    await ticketStore.actions.create(data);
    router.push({name: 'tickets.index'});
};

</script>

<template>
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Create New Ticket</h1>
        </div>
    </div>

    <TicketForm :ticket="ticket" @submit="handleSubmit" />
</template>