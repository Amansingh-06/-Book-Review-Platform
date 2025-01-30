import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch user details
export const fetchUser = createAsyncThunk("user/fetchUser", async (id) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:5000/api/user/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }

    return await response.json();
});

// ✅ Update user details
export const updateUser = createAsyncThunk("user/updateUser", async ({ id, userData }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`http://localhost:5000/api/user/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData.message || "Failed to update user data");
        }

        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            // ✅ Fetch User
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            // ✅ Update User
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = { ...state.user, ...action.payload }; // ✅ Merge updated data
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
