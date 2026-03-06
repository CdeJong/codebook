import { ComputedRef, Ref } from "vue";

export type Identifiable = { 
    id: number;
};

export type State<T extends Identifiable> = Ref<Record<number, Readonly<T>>>;

export type New<T extends Identifiable> = Omit<T, 'id'>;

export type Updatable<T extends Identifiable> = New<T> & {
    id?: number;
};

export type StoreModule<T extends Identifiable> = {
    getters: {
        getAll: () => ComputedRef<Readonly<T>[]>;
        getById: (id: number) => ComputedRef<Readonly<T>>;
    };
    setters: {
        setAll: (items: T[]) => void;
        set: (item: T) => void;
        deleteById: (id: number) => void;
    };
    actions: {
        fetchAll: () => Promise<void>;
        fetchById: (id: number) => Promise<void>;
        create: (item: New<T>) => Promise<void>;
        update: (id: number, item: Updatable<T>) => Promise<void>;
        delete: (item: T) => Promise<void>;
    };
    state: State<T>
}