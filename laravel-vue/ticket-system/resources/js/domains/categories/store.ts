import { storeModuleFactory } from "@/services/store";
import { Category } from "@/domains/categories/category";

export const categoryStore = storeModuleFactory<Category>('categories');