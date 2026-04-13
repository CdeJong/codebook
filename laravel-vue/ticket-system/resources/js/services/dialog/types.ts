import { Component } from "vue"


export interface ConfirmDialogData {
    component: Component,
    title: string,
    description: string,
    closeButtonText: string,
    onClose : null | (() => void),
    confirmButtonText: string,
    onConfirm : null | (() => void),
}

export interface NoticeDialogData {
    component: Component,
    title: string,
    description: string,
    closeButtonText: string,
    onClose : null | (() => void)
}