import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/bookSlice";
import BookCard from "../components/BookCard";

function Home() {
    const dispatch = useDispatch();
    const { books, loading } = useSelector((state) => state.books);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Featured Books</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {books.slice(0, 6).map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
}

export default Home;
