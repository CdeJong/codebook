import { postRequest, getRequest, putRequest, deleteRequest,  } from '@/services/http';
import { ref, computed } from 'vue';
import { Author } from '@/domains/authors/author';
import { AuthorFormData } from "@/domains/authors/author";

const authors = ref<Author[]>([]);

export const fetchAuthors = async () : Promise<void> => {
    const {data} = await getRequest('/authors');
    if (!data) {
        return;
    }
    authors.value = data;
}

export const createAuthor = async (newAuthor : AuthorFormData) : Promise<void> => {
    const {data} = await postRequest("/authors", newAuthor);
    if (!data) {
        return;
    }
    authors.value = data;
}

export const getAllAuthors = computed(() => authors.value);

export const getAuthorById = (id : number) => computed(() => authors.value.find(author => author.id == id));

export const updateAuthor = async (authorId : number, updatedAuthor : AuthorFormData) : Promise<void> => {
    const {data} = await putRequest('/authors/' + authorId, updatedAuthor);
    if (!data) {
        return;
    }
    authors.value = data;
}

export const deleteAuthor = async (authorId : number) : Promise<void> => {
    await deleteRequest('/authors/' + authorId);
    authors.value = authors.value.filter(author => author.id !== authorId)
}