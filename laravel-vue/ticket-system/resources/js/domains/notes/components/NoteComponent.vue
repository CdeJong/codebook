<script setup lang="ts">
import { Note } from '@/domains/notes/note';
import { showConfirm } from '@/services/dialog';
import { format } from '@/utils/datetime';
import { ref, computed, watch } from 'vue';
import { userStore } from '@/domains/users/store';

const note = defineModel<Note>({ required: true });

const emit = defineEmits(['deleteNote', 'updateNote'])

const isEditing = ref<boolean>(false);
const formNote = ref<Note>({ ...note.value }); 
    
watch(note, (val) => {
    console.log('note update', val);
})    

const handleEdit = () => {
    isEditing.value = true;
}

const handleDelete = () => {
    showConfirm(
        "Delete note", 
        "Are you sure you want to delete this note?",
        null,
        handleConfirmedDelete
    );
}

const handleConfirmedDelete = async () => {
    emit('deleteNote', note.value.id);
}

const handleSave = () => {
    emit('updateNote', formNote.value);
    isEditing.value = false;
}

const handleCancel = () => {
    isEditing.value = false;
}


const user = userStore.getters.getById(note.value.user_id);
const username = computed(() => {
    if (!user.value) {
        return '';
    }
    return user.value.first_name + ' ' + user.value.last_name;
});

const isEdited = computed(() => {
    return note.value.created_at !== note.value.updated_at;
})

</script>

<template>
<form v-if="isEditing" class="note" @submit.prevent="handleSave">
    <div class="note-header">
        <div class="profile-picture"></div>
        <h3 class="title">{{ username }}</h3>
        <button title="Save note" type="submit">
            <i class="fa-solid fa-floppy-disk primary"></i>
        </button>
        <button title="Cancel edit" @click.prevent="handleCancel">
            <i class="fa-solid fa-xmark danger"></i>
        </button>
    </div>
    <textarea class="note-content" v-model="formNote.content"></textarea>
    <div v-if="isEdited" 
        class="note-footer" 
        :title="'Last edited ' + format(note.updated_at)"
    >{{ format(note.created_at) }} (Edited)</div>
    <div v-else class="note-footer">{{ format(note.created_at) }}</div>
</form>

<div v-else class="note">
    <div class="note-header">
        <div class="profile-picture"></div>
        <h3 class="title">{{ username }}</h3>
        <button class="hide" title="Edit note" @click.prevent="handleEdit">
            <i class="fa-solid fa-pen primary"></i>
        </button>
        <button class="hide" title="Delete note" @click.prevent="handleDelete">
            <i class="fa-solid fa-trash danger"></i>
        </button>
    </div>
    <div class="note-content">{{ note.content }}</div>
    <div v-if="isEdited" 
        class="note-footer" 
        :title="'Last edited ' + format(note.updated_at)"
    >{{ format(note.created_at) }} (Edited)</div>
    <div v-else class="note-footer">{{ format(note.created_at) }}</div>
</div>
</template>

<style scoped>
.note {
    background-color: white;
    padding-left: 50px;
}

.note .note-header {
    display: flex;
    align-items: center;
    position: relative;
}

.note .note-header .profile-picture {
    position: absolute;
    top: 5px;
    left: -45px;

    background-color: rgb(192, 224, 252);
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.note .note-header .title {
    flex-grow: 1;
}

.note .note-header button {
    background: none;
    border: none;
    padding: 0.25em;
    cursor: pointer;
}

button.hide {
    transition: 0.5s opacity;
    opacity: 0;
}

.note:hover button.hide {
    opacity: 1;
}

.note .note-content {
    margin-bottom: 0.5em;
    white-space: pre-wrap;
}

.note textarea {
    width: calc(100% - 5px);
    border: none;
    background-color: #e7e7e7;
    padding: 0;
    min-height: 50px;
    border-bottom: 1px solid black;
    margin-right: 5px;
}

.note .note-footer {
    font-size: 0.9em;
    margin-bottom: 0.5em;
}

.primary {
    color: rgb(42, 224, 224);
}

.danger {
    color: red;
}
</style>