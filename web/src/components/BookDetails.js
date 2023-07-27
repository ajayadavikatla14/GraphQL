import React from 'react';
import { useQuery } from "@apollo/client";
import { GetBookQuery } from '../queries/queries';

const BookDetails = ({ bookId }) => {
    const { loading, error, data } = useQuery(GetBookQuery, {
        variables: { id: bookId },
        skip: !bookId
    });
    const [book, setBook] = React.useState(null);

    React.useEffect(() => {
        if (data && data?.book) {
            setBook(data.book);
        }
    }, [data])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            {book && (<div>
                <h2>{book.name}</h2>
                <p>{book.genre}</p>
                <p>{book.author.name}</p>
                <h4>All Books By this Author: </h4>
                {book.author?.books && book.author.books.map((bookslist) => {
                    return (<li key={bookslist.id}>
                        {bookslist.name}
                    </li>)
                })}
            </div>)}
        </>
    )
}

export default BookDetails