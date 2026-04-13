import { User } from "@/domains/users/user"

export type Comment = {
    id: number,
    user_id: number,
    ticket_id: number,
    content: string,
    created_at: string,
    updated_at: string,
}