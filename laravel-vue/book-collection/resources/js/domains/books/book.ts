export interface Book {
    id : number,
    author_id : number, 
    title : string,
    description : string
}

export interface BookFormData extends Omit<Book, 'id'> {}