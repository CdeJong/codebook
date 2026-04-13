import { Note } from "@/domains/notes/note"
import { Comment } from "@/domains/comments/comment"

export type Ticket = {
    id: number,
    user_id: number
    assigned_user_id: null | number
    category_ids: number[],
    title: string,
    content: string,
    status: string,
    created_at: string,
    updated_at: string,

    notes: Note[], // could be undefined on runtime
    comments: Comment[], // could be undefined on runtime
}


