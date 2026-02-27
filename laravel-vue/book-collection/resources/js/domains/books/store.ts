import { storeModuleFactory } from "@/services/store";
import { Book } from "@/domains/books/book";

export const bookStore = storeModuleFactory<Book>('books');
