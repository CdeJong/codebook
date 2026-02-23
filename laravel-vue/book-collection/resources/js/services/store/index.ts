import { Ref, computed, ComputedRef, ref } from "vue";
import { getRequest, postRequest, putRequest, deleteRequest } from "@/services/http";


type Identifiable = {
    id: number;
};

export const storeModuleFactory = <T extends Identifiable>(moduleName : string) => {

    const state : Ref<Record<number, Readonly<T>>> = ref({});

    const getters = {
        all: computed(() => state.value),
        byId: (id : number) => computed(() => state.value[id])
    };

    const setters = {
        setAll: (items : T[]) => {
            for (const item of items) {
                state.value[item.id] = Object.freeze(item);
            }
        }
    }

    const actions = {
        getAll: async () => {
            const {data} = await getRequest(moduleName);
            if (!data) {
                return;
            }
            setters.setAll(data);
        },

        create: async (item : T) => { // TODO id is missing
            const {data} = await postRequest(moduleName, item);
            if (!data) {
                return;
            }
            setters.setAll(data);
        },

        update: async (id : number, item : T) => { // TODO id could be missing
            const {data} = await putRequest(moduleName + '/' + id, item);
            if (!data) {
                return;
            }
            setters.setAll(data);
        },

        delete: async (item : T) => {
            await deleteRequest(moduleName + '/' + item.id);
            delete state.value[item.id];
        }
     }

    return { getters, setters, actions }

}