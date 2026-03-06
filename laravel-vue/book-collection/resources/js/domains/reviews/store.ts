import { storeModuleFactory } from "@/services/store";
import { Review } from "@/domains/reviews/review";
import { StoreModule } from "@/services/store/types";
import { computed, ComputedRef } from "vue";

type ReviewStoreModule = StoreModule<Review> & {
    getters: {
        getByBookId: (bookId: number) => ComputedRef<Readonly<Review>[]>
    } & StoreModule<Review>['getters'] // keep original getters too
}

export const reviewStore = storeModuleFactory<Review>("reviews") as ReviewStoreModule;

// reviewStore.actions.fetchByBookId = async (bookId : number) => {
//     const {data} = await getRequest("books" + '/' + bookId + '/reviews');
//     if (!data) {
//         return;
//     }
//     reviewStore.setters.setAll(data);
// }

reviewStore.getters.getByBookId = (bookId : number) => {
    return computed(() => Object.values(reviewStore.state.value).filter(review => review.book_id === bookId));
};
