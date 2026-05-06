import { computed, ref } from "vue";
import { getRequest, postRequest, putRequest, deleteRequest } from "@/services/http";
import { Identifiable, State, New, Updatable } from "@/services/store/types"

export const storeModuleFactory = <T extends Identifiable>(moduleName : string) => {

    const state : State<T> = ref({});
    const computedState = computed(() => Object.values(state.value));

    const getters = {
        getAll: () => computedState,
        getById: (id: number) => computed(() => state.value[id])
    };
    
    const setters = {

        setAll: (items : T[]) => {
            state.value = {}; // clear state to fix issues on swithing users

            for (const item of items) {
                setters.set(item);
            }
        },

        set: (item : T) => {
            state.value[item.id] = Object.freeze(item);
        },

        deleteById: (id : number) => {
            delete state.value[id];
        },

        clear: () => {
            state.value = {};
        }
    }
    
    const actions = {

        fetchAll: async () => {
            const {data} = await getRequest(moduleName);
            if (!data) {
                return;
            }
            setters.setAll(data);
        },

        fetchById: async (id : number) => {
            const {data} = await getRequest(moduleName + '/' + id);
            if (!data) {
                return;
            }
            setters.set(data);
        },

        create: async (item : New<T>) : Promise<T | undefined> => {
            const {data} = await postRequest(moduleName, item);
            if (!data) {
                return undefined;
            }
            setters.set(data);
            return data;
        },

        update: async (id : number, item : Updatable<T>) => {
            const {data} = await putRequest(moduleName + '/' + id, item);
            if (!data) {
                return undefined;
            }
            setters.set(data);
            return data;
        },

        delete: async (item : T) => {
            await actions.deleteById(item.id);
        },

        deleteById: async (id : number) => {
            await deleteRequest(moduleName + '/' + id).then(
                _ => setters.deleteById(id), // success
            );
        }

     }

    return { getters, setters, actions, state }

}