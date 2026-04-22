<script setup lang="ts">
import { computed, ref } from 'vue';
import NoteComponent from '@/domains/notes/components/NoteComponent.vue';
import { Ticket } from '@/domains/tickets/ticket';
import { noteStore } from '@/domains/notes/store';
import { ticketStore } from '@/domains/tickets/store';
import { Note } from '@/domains/notes/note';

const ticket = defineModel<Ticket>({ required: true });
const form = ref<Note>({
    content: '',
    ticket_id: ticket.value.id,

    id: 0,
    user_id: 0,
    created_at: '',
    updated_at: ''
});

const handleCreate = async () => {
    const copyForm = {...form.value};
    form.value.content = '';

    // created note has database created id, created_at and updated_at values
    const createdNote = await noteStore.actions.create(copyForm);

    if (!createdNote) {
        return;
    }

    // update locally in ticketStore
    const copy = { ...ticket.value }
    copy.notes.push(createdNote);
    ticketStore.setters.set(copy);
}

const handleUpdate = async (note : Note) => {
    // updated note has database created updated_at value
    const updatedNote = await noteStore.actions.update(note.id, note);

    if (!updatedNote) {
        return;
    }

    // update locally in ticketStore
    const copy = { ...ticket.value };
    const index = copy.notes.findIndex(n => n.id === note.id);
    if (index === -1) {
        return;
    }
    copy.notes.splice(index, 1, updatedNote);
    ticketStore.setters.set(copy);
}

const handleDelete = async (noteId : number) => {
    await noteStore.actions.deleteById(noteId);

    // update locally in ticketStore
    const copy = { ...ticket.value };
    copy.notes = copy.notes.filter(note => note.id !== noteId);
    ticketStore.setters.set(copy);
}

const sortedNotes = computed(() => {
    if (!ticket.value || !ticket.value.notes || ticket.value.notes.length < 1) {
        return [];
    }
    return ticket.value.notes.sort((note1, note2) => new Date(note1.created_at).getTime() - new Date(note2.created_at).getTime());
});
 
</script>

<template>
<div>
    <form class="form" @submit.prevent="handleCreate">
        <textarea v-model="form.content" :class="{ 'has-value': form.content.trim().length > 0 }" placeholder="Add a new note (Admins only)" required></textarea>
        <button class="button">Post Note</button>
    </form>
    
    <div class="notes">
        <NoteComponent v-for="note, index in sortedNotes" v-model="sortedNotes[index]" :key="note.id" @updateNote="handleUpdate" @deleteNote="handleDelete" />
    </div>
    
</div>    

</template>

<style scoped>
textarea {
    min-height: 20px;
    height: auto;
    transition: ease-in-out 0.5s min-height;
}

textarea:focus {
    min-height: 100px;
}

textarea.has-value {
    min-height: 100px;
}

textarea,
.form {
    width: 100%;
    box-sizing: border-box;
}

.form,
.notes {
    padding: 0.5em;
}

.notes {
    margin-top: 0.5em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}
</style>