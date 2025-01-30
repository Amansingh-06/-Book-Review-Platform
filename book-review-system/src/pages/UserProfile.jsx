import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "../redux/userSlice";

function UserProfile() {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({ name: "", email: "" });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            dispatch(fetchUser(decodedToken.id)); // Fetch user details
        }
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setFormData({ name: user.name, email: user.email });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser({ id: user._id, userData: formData })); // Update user
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block font-semibold">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        disabled // Email change disable rahe
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Update Profile
                </button>
            </form>
        </div>
    );
}

export default UserProfile;
