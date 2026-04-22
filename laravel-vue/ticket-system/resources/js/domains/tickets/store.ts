import { storeModuleFactory } from "@/services/store";
import { Ticket } from "@/domains/tickets/ticket";
import { patchRequest } from "@/services/http";

const baseStore = storeModuleFactory<Ticket>('tickets');

export const ticketStore = {
    getters: {...baseStore.getters},
    setters: {...baseStore.setters},
    actions: {...baseStore.actions,

        patchAssignee: async (ticketId : number, userId : number | null) => {
            const {data} = await patchRequest('tickets/' + ticketId + '/assignee', { 'assigned_user_id': userId });
            if (!data) {
                return;
            }
            ticketStore.setters.set(data);
        },
        
        patchStatus: async (ticketId : number, status : string) => {
            const {data} = await patchRequest('tickets/' + ticketId + '/status', { 'status': status });
            if (!data) {
                return;
            }
            ticketStore.setters.set(data);
        },

        patchCategories: async (ticketId : number, categoryIds : number[]) => {
            const {data} = await patchRequest('tickets/' + ticketId + '/categories', { 'category_ids': categoryIds });
            if (!data) {
                return;
            }
            ticketStore.setters.set(data);
        },

    },
}