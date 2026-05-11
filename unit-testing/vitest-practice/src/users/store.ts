import { User } from "@/users/user";

const users: User[] = [
    {id: 1, name: 'Anna', active: true},
    {id: 2, name: 'Bram', active: false},
    {id: 3, name: 'Cem', active: true},
];

export const getUser = (id: number): User | undefined => {
    if (id < 0) return undefined;
    if (id === 500) return {id: 500, name: 'Easter Egg', active: true} // testing coverage: braches
    return users.find(u => u.id === id);
};

export const addUser = (user: User): void => {
    const id = user.id;

    if (id === 500) {
        throw new EasterEggError('id used by easter egg');
    }

    if (users.find(u => u.id === id) !== undefined) {
        throw new IllegalArgumentError('id already used!');
    }

    users.push(user);
}

export class IllegalArgumentError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'IllegalArgumentError'
        Object.setPrototypeOf(this, IllegalArgumentError.prototype);
    }
}

export class EasterEggError extends IllegalArgumentError {
    constructor(message?: string) {
        super(message);
        this.name = 'EasterEggError'
        Object.setPrototypeOf(this, EasterEggError.prototype);
    }
}

export const getAllUsers = () => [...users]; // copy to verify immutability in tests