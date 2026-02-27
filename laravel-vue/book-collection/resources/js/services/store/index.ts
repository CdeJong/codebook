import { Ref, computed, ref } from "vue";
import { getRequest, postRequest, putRequest, deleteRequest } from "@/services/http";


type Identifiable = { 
    id: number;
};

type State<T extends Identifiable> = Ref<Record<number, Readonly<T>>>;

type New<T extends Identifiable> = Omit<T, 'id'>;

type Updatable<T extends Identifiable> = New<T> & {
    id?: number;
};

export const storeModuleFactory = <T extends Identifiable>(moduleName : string) => {

    const state : State<T> = ref({});
    const computedState = computed(() => Object.values(state.value));

    const getAll = computed(() => 
        Object.values(state.value)
    );

    const getById = (id: number) => computed(() => 
        state.value[id]
    );


    const getters = {
        getAll: () => computedState,
        getById: (id: number) => computed(() => state.value[id])
    };
    
    const setters = {

        setAll: (items : T[]) => {
            for (const item of items) {
                setters.set(item);
            }
        },

        set: (item : T) => {
            state.value[item.id] = Object.freeze(item);
        },

        deleteById: (id : number) => {
            delete state.value[id];
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

        create: async (item : New<T>) => {
            const {data} = await postRequest(moduleName, item);
            if (!data) {
                return;
            }
            setters.set(data);
        },

        update: async (id : number, item : Updatable<T>) => {
            const {data} = await putRequest(moduleName + '/' + id, item);
            if (!data) {
                return;
            }
            setters.set(data);
        },

        delete: async (item : T) => {
            await deleteRequest(moduleName + '/' + item.id);
            setters.deleteById(item.id);
        }

     }

    return { getters, setters, actions }

}