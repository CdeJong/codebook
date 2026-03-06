import { Author } from "@/domains/authors/author";

// export interface Book {
//     id : number,
//     author_id : number,
//     author : Author,
//     title : string,
//     description : string
// }

export interface Book {
    id : number,
    author_id : number,
    author? : Author,
    title : string,
    description : string
}
