import { storeModuleFactory } from "@/services/store";
import { Comment } from "@/domains/comments/comment";

export const commentStore = storeModuleFactory<Comment>("comments");