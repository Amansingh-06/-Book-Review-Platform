import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, fetchUser } from "../redux/userSlice";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
console.log(user)
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && !user) {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            dispatch(fetchUser(decodedToken.id)); // ✅ Redux me user data load karein
        }
    }, [user, dispatch]);

    const handleLogout = async () => {
        try {
            await fetch("http://localhost:5000/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            dispatch(logout()); // Redux se user data remove karein
            localStorage.removeItem("token"); // Token bhi remove karein
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">📚 BookStore</Link>

                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                    <Link to="/books" className="hover:text-gray-300">Books</Link>
                    {user && <Link to="/profile" className="hover:text-gray-300">Profile</Link>}
                    

                    {user?.isAdmin && (
                        <Link to="/addbook" className="hover:text-gray-300">Add Book</Link>
                    )}

                    {user && <span className="text-white">{user.name}</span>}

                    {user ? (
                        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="hover:text-gray-300">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
