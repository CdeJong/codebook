import { ref, Ref } from "vue"
import { Dialog } from "@/services/dialog/types"

const openDialog = ref<Dialog | null>(null);

export const useDialog = () => {
    const get = () : Ref<Dialog | null> => {
        return openDialog;
    }

    const show = (dialog : Dialog) : void => {
        openDialog.value = {
            buttons: [],
            onClose: null,
            ...dialog
        }
    }

    const close = () => {
        if (openDialog.value === null) {
            return;
        }
        openDialog.value.onClose?.();
        openDialog.value = null;
    }

    return { get, show, close }
}