import {VueWrapper} from '@vue/test-utils';

// Extend VueWrapper met getByDataTest method
declare module '@vue/test-utils' {
    interface VueWrapper {
        findByDataTest(selector: string): ReturnType<VueWrapper['find']>;
        findAllByDataTest(selector: string): ReturnType<VueWrapper['findAll']>
    }
}

// Helper functie om elementen te vinden via data-test attribuut
VueWrapper.prototype.findByDataTest = function (selector: string) {
    return this.find(`[data-test="${selector}"]`);
};

VueWrapper.prototype.findAllByDataTest = function (selector: string) {
    return this.findAll(`[data-test="${selector}"]`);
};