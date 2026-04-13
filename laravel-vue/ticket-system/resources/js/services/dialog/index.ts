import { computed, markRaw, ref } from "vue"
import { ConfirmDialogData, NoticeDialogData } from "@/services/dialog/types"
import ConfirmDialog from "./ConfirmDialog.vue";
import NoticeDialog from "./NoticeDialog.vue";

const currentDialog = ref<ConfirmDialogData | NoticeDialogData | null>(null);

export const getCurrentDialog = computed(() => currentDialog.value);

export const closeCurrent = () => {
    if (!currentDialog.value) {
        return;
    }
    currentDialog.value.onClose?.();
    currentDialog.value = null;
}

export const confirmCurrent = () => {
    if (!currentDialog.value) {
        return;
    }
    if ("onConfirm" in currentDialog.value) {
        currentDialog.value.onConfirm?.(); // run if not null
    }
    currentDialog.value.onClose?.(); // run if not null
    currentDialog.value = null;
}


export const showConfirm = (
    title : string,
    description : string,
    onClose : null | (() => void) = null,
    onConfirm : null | (() => void) = null,
    closeButtonText : string = "Close",
    confirmButtonText : string = "Confirm"
) => {
    closeCurrent();
    currentDialog.value = {
        component: markRaw(ConfirmDialog),
        title: title,
        description: description,
        closeButtonText: closeButtonText,
        onClose: onClose,
        confirmButtonText: confirmButtonText,
        onConfirm: onConfirm
    }
}

export const showNotice = (
    title : string,
    description : string,
    onClose : null | (() => void) = null, 
    closeButtonText : string = "Okay",
) => {
    closeCurrent();
    currentDialog.value = {
        component: markRaw(NoticeDialog),
        title: title,
        description: description,
        closeButtonText: closeButtonText,
        onClose: onClose,
    }
}