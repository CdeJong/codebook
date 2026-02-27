import { Author } from '@/domains/authors/author';
import { storeModuleFactory } from '@/services/store';

export const authorStore = storeModuleFactory<Author>('authors');