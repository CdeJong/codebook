import axios from "axios";
import { ref, computed } from 'vue';
import { Author } from '@/domains/authors/author';

const authors = ref<Author[]>([]);

export const getAllAuthors = computed(() => authors.value);

export const fetchAuthors = async () : Promise<void> => {
    const {data} = await axios.get('/api/authors');
    if (!data) {
        return;
    }
    authors.value = data;
}