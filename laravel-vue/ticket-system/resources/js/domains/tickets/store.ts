import { storeModuleFactory } from "@/services/store";
import { Ticket } from "@/domains/tickets/ticket";

const baseStore = storeModuleFactory<Ticket>('tickets');

export const ticketStore = {
    getters: {...baseStore.getters},
    setters: {...baseStore.setters},
    actions: {...baseStore.actions,

        patchAssignee: (userId : number) => {

        },
        
        patchStatus: (status : string) => {

        },

        patchCategories: (categoryIds : number[]) => {

        },

    },
}