import { storeModuleFactory } from "@/services/store";
import { User } from "@/domains/users/user";

export const userStore = storeModuleFactory<User>('users');

