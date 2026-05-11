export const filterEven = (numbers: number[]) : number[] => {
    return numbers.filter(num => num % 2 === 0);
}

export const filterOdd = (numbers: number[]) : number[] => {
    return numbers.filter(num => num % 2 !== 0);
}