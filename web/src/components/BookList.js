import React from 'react';
import { useQuery } from "@apollo/client";
import { GetBooksQuery } from "../queries/queries";

import BookDetails from './BookDetails';

const BookList = () => {

  const { loading, error, data } = useQuery(GetBooksQuery);
  const [books, setBooks] = React.useState([]);
  const [selectedBookId, setSelectedBookId] = React.useState(null);

  React.useEffect(() => {
    if(data && data?.books) {
      setBooks(data.books);
    }
  }, [data])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul id="book-list">
        {books && books.length > 0 && books.map((x) => {
          return (<li key={x.id} onClick={() => setSelectedBookId(x.id)}>{x.name}</li>)
        })}
      </ul>
      <BookDetails bookId={selectedBookId} />
    </div>
  )
}

export default BookList;