export interface Book {
    id : number,
    author_id : number, 
    title : string,
    description : string
}

export interface BookFormData {
    title : string,
    description : string,
    author_id : number|null
}