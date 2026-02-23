import axios from "axios";
import { ref, computed } from 'vue';
import { Book, BookFormData } from "@/domains/books/book";

const books = ref<Book[]>([]);

export const getAllBooks = computed(() => books.value);

export const fetchBooks = async () : Promise<void> => {
    const {data} = await axios.get('/api/books');
    if (!data) {
        return;
    }
    books.value = data;
}

export const createBook = async (newBook : BookFormData) : Promise<void> => {
    const {data} = await axios.post('/api/books', newBook);
    if (!data) {
        return;
    }
    books.value = data;
}