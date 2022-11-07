import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { selectAllPosts } from "../posts/postsSlice";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll);
    }
})


export const selectPostsByUser = createSelector(
    // Notice tjat setAllPosts selector get from another slice 
    // we call setAllPosts for get all posts, than call a small selector func for get an id,
    // actualy, this id will be receive from math.params
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(posts => posts.user === userId)
)

export const { 
    selectAll: selectAllUsers, 
    selectById: selectUserById 
} = usersAdapter.getSelectors(state => state.users);

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
    const response = await client.get('/fakeApi/users');
    return response.data;
})

export default usersSlice.reducer;