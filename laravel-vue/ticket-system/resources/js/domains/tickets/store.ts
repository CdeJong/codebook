import { storeModuleFactory } from "@/services/store";
import { Ticket } from "@/domains/tickets/ticket";
import { Note } from "@/domains/notes/note";
import { Comment } from "@/domains/comments/comment";

const baseStore = storeModuleFactory<Ticket>('tickets');

export const ticketStore = {
    getters: {...baseStore.getters},
    setters: {...baseStore.setters,

        // setNote: (note : Note) => {

        // },

        deleteNote: (id : Number) => {
            for (const ticketId in baseStore.state.value) {
                const ticket = baseStore.state.value[ticketId];
                if (!ticket.notes) {
                    continue;
                }
                const index = ticket.notes.findIndex(note => note.id === id);
                if (index !== -1) {
                    ticket.notes.splice(index, 1);
                    // baseStore.setters.set(ticket);
                    // console.log('setting ticket: ', ticket)
                }
            }
        },

        // setComment: (comment : Comment) => {

        // },

        deleteComment: (id : Number) => {
            for (const ticket of Object.values(baseStore.state.value)) {
                const index = ticket.comments.findIndex(comment => comment.id === id);
                if (index !== -1) {
                    ticket.comments.splice(index, 1)
                }
            }
        }

    },
    actions: {...baseStore.actions},
}