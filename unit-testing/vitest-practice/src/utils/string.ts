
export const capitalize = (value : string) : string => {
    if (value.length === 0) {
        return value;
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export const removeSpaces = (value : string) : string => {
    return value.replaceAll(' ', '');
}