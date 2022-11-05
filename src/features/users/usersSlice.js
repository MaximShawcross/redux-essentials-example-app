import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

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

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
    const response = await client.get('/fakeApi/users');
    return response.data
})

export default usersSlice.reducer;