import { postRequest, getRequest, putRequest, deleteRequest,  } from '@/services/http';
import { ref, computed } from 'vue';
import { Book, BookFormData } from "@/domains/books/book";

const books = ref<Book[]>([]);

export const getAllBooks = computed(() => books.value);

export const fetchBooks = async () : Promise<void> => {
    const {data} = await getRequest('/books');
    if (!data) {
        return;
    }
    books.value = data;
}

export const createBook = async (newBook : BookFormData) : Promise<void> => {
    const {data} = await postRequest('/books', newBook);
    if (!data) {
        return;
    }
    books.value = data;
}

// only currently fetched books
export const getBookById = (id : number) => computed(() => books.value.find(book => book.id == id));

export const updateBook = async (bookId : number, updatedBook : BookFormData) : Promise<void> => {
    const {data} = await putRequest('/books/' + bookId, updatedBook);
    if (!data) {
        return;
    }
    books.value = data;
}

export const deleteBook = async (bookId : number) : Promise<void> => {
    await deleteRequest('/books/' + bookId);
    books.value = books.value.filter(book => book.id !== bookId);
}