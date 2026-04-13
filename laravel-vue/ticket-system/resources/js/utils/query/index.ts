
export const getQueryParam = (value: string | null | (string | null)[] | undefined) : string | undefined => {
    if (Array.isArray(value)) {
        return value[0] ?? undefined;
    }

    return value ?? undefined;
};

export const getNumberParam = (value: string | null | (string | null)[] | undefined) : number | undefined => {
    const stringValue = getQueryParam(value);

    if (stringValue == undefined) {
        return undefined;
    }

    const numberValue = +stringValue;
    return isNaN(numberValue) ? undefined : numberValue;
}