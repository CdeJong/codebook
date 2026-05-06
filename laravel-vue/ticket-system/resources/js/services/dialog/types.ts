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

export interface Dialog {
    title: string,
    description: string,
    buttons?: Button[],
    onClose?: null | (() => void),
    style?: string // class name
}

export interface Button {
    text: string,
    onClick?: null | (() => void),
    style?: string // class name
}