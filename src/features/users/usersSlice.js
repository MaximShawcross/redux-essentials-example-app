import {createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { setAllPosts } from "../posts/postsSlice";

const initialState = [];

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const selectAllUsers = (state) => state.users;

export const selectUserById = (state, userId) => state.users.find(user => user.id === userId);

export const selectPostsByUser = createSelector(
    // Notice tjat setAllPosts selector get from another slice 
    // we call setAllPosts for get all posts, than call a small selector func for get an id,
    // actualy, this id will be receive from math.params
    [setAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(posts => posts.user === userId)
)

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
    const response = await client.get('/fakeApi/users');
    return response.data;
})

export default usersSlice.reducer;