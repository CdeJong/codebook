import { storeModuleFactory } from "@/services/store";
import { Note } from "@/domains/notes/note";


export const noteStore = storeModuleFactory<Note>("notes");
