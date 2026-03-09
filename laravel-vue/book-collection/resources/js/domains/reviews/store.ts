import { storeModuleFactory } from "@/services/store";
import { Review } from "@/domains/reviews/review";
import { computed } from "vue";
import { getRequest } from "@/services/http";

const baseStore = storeModuleFactory<Review>("reviews");

export const reviewStore = {
    getters: {...baseStore.getters,

        getByBookId: (bookId : number) => {
            return computed(() => Object.values(baseStore.state.value).filter(review => review.book_id === bookId));
        }

    },
    setters: {...baseStore.setters},
    actions: {...baseStore.actions,

        fetchByBookId: async (bookId : number) => {
            const {data} = await getRequest("books" + '/' + bookId + '/reviews');
            if (!data) {
                return;
            }
            reviewStore.setters.setAll(data);
        }

    },
}
