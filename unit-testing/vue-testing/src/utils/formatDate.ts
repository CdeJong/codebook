
const months = [
    'januari', 
    'februari', 
    'maart', 
    'april', 
    'mei', 
    'juni',
    'juli', 
    'augustus', 
    'september', 
    'oktober', 
    'november', 
    'december'
];

export const formatDate = (date: Date) : string => {
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}