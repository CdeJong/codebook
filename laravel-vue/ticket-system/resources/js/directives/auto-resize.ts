import { Directive } from "vue";

export type AutoResizeDirective = Directive<HTMLElement, string>;

declare module 'vue' {
    export interface GlobalDirectives {
        vAutoResize: AutoResizeDirective
    }
}

export default {
    mounted: (element) => {
        if (!(element instanceof HTMLTextAreaElement)) {
            return;
        }

        const resize = () => {
            // causes some glitchy behavior, but without it never makes the textarea small again
            // element.style.height = 'auto';
            element.style.height = element.scrollHeight + 'px';    
        }
        element.addEventListener("input", resize);
        resize();
    }
} satisfies AutoResizeDirective