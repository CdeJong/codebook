import { User } from "@/domains/users/user"
import { getRequest, postRequest } from "@/services/http"
import { ref, computed } from "vue"

export type UserProfile = User & {
    is_admin: boolean,
    email: string,
    created_at: string,
}

export type LoginInput = {
    email: string,
    password: string
}

const loggedInUser = ref<UserProfile | null>(null);

export const isLoggedIn = computed(() => {
    return loggedInUser.value !== null;
});

export const getLoggedInUser = computed(() => {
    return loggedInUser.value;
});

export const isAdmin = computed(() => {
    return loggedInUser.value?.is_admin === true;
});


export const login = async (input : LoginInput) => {
    const {data} = await postRequest("login", input);
    if (!data) {
        return;
    }
    loggedInUser.value = data;
}

export const logout = async () => {
    await postRequest('logout', {});
    loggedInUser.value = null;
}

export const me = async () => {
    const {data} = await getRequest("me");
    if (!data) {
        return;
    }
    loggedInUser.value = data;
}