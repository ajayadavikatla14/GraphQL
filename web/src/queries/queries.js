import {  gql } from "@apollo/client";

const GetBooksQuery = gql`
{
  books {
    name
    genre
    id
  }
}
`

const GetAuthorsQuery = gql`
{
    authors{
        name
        id
    }
}
`

const AddBookMutaion = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre:$genre, authorId: $authorId){
            name
            genre
        }
    }
`

const GetBookQuery = gql`
query($id: ID!){
    book(id: $id) {
        id
        name
        genre
        author{
            id
            name
            age
            books{
                name
                id
            }
        }
    }
}
`

export { GetBooksQuery, GetAuthorsQuery, AddBookMutaion, GetBookQuery };