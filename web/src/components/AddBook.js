import React from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { GetAuthorsQuery, AddBookMutaion, GetBooksQuery } from '../queries/queries';

const AddBook = () => {

    const { loading, error, data } = useQuery(GetAuthorsQuery);
    const [authors, setAuthors] = React.useState([]);
    const [row, setRow] = React.useState({});
    const [errors, setErrors] = React.useState(null);
    //added useMutaion
    const [addBook] = useMutation(AddBookMutaion);

    const OnInputChanged = (e) => {
        setRow((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    };

    const OnAddBookClicked = (e) => {
        e.preventDefault();
        addBook({ variables: { 
            name: row?.name, 
            genre: row?.genre, 
            authorId: row?.authorId },
            refetchQueries: [{ query: GetBooksQuery }]
         })
            .then((response) => {
                setRow({});
            })
            .catch((error) => {
                setErrors('Error adding book:', error);
                console.error('Error adding book:', error);
            });
    };

    React.useEffect(() => {
        if (data && data?.authors) {
            setAuthors(data.authors);
        }
    }, [data])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <ul className='add-book'>
                <div className="heading">
                    <h3 className="head">Add Book</h3>
                </div>
                <li>Book Name:
                    <input type="text" name='name' value={row?.name} onChange={(e) => OnInputChanged(e, "name")} />
                </li> <br />
                <li>Genre:
                    <input type="text" name='genre' value={row?.genre} onChange={(e) => OnInputChanged(e)} />
                </li> <br />
                <li>
                    <select name='authorId' onChange={(e) => OnInputChanged(e)}>
                        <option value="" >Select Author</option>
                        {authors && authors.length > 0 &&
                            authors.map((x) => {
                                return (<option key={x.id} value={x.id} >{x.name}</option>)
                            })
                        }
                    </select>
                </li> <br />
                <li>
                    <input type="button" value="+" onClick={(e) => OnAddBookClicked(e)} />
                </li>

                {errors && <div className="error"><li>{errors}</li></div>}
                
            </ul>
        </>
    )
}

export default AddBook