import { ComputedRef, Ref } from "vue";

export type Identifiable = { 
    id: number;
};

export type State<T extends Identifiable> = Ref<Record<number, Readonly<T>>>;

export type New<T extends Identifiable> = Omit<T, 'id'>;

export type Updatable<T extends Identifiable> = New<T> & {
    id?: number;
};