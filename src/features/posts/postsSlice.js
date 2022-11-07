import { createSlice, nanoid, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState = postsAdapter.getInitialState({
    status: 'idle',
    error: null
})

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            //prepare using for prepare our action object to use this on reducer 
            prepare (title, content, user) {
                return {
                    payload: {
                        id: nanoid(),
                        time: new Date().toISOString(),
                        title,
                        content,
                        user,
                        reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
                    }
                }
            }
        },
        postUpdated(state, action) {
            const {title, content, id} = action.payload;
            const exitingPost = state.entities[id];  /*was before entity adapter: state.posts.find(post => post.id === postId) */

            if (exitingPost) {
                exitingPost.content = content;
                exitingPost.title = title;
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.entities[postId];  /*was before entity adapter: state.posts.find(post => post.id === postId) */
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            // Add any fetched posts to the array
            // Use the `upsertMany` reducer as a mutating update utility
            postsAdapter.upsertMany(state, action.payload)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(addNewPost.fulfilled, postsAdapter.addOne);
    }
})

// should to use with dispatch(setAllPosts)

// async thunk for get initial posts state 
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await client.get('/fakeApi/posts');
    return response.data; 
})

export const addNewPost = createAsyncThunk("posts/addNewPost", async (initialPost) => {
    const response = await client.post('fakeApi/posts', initialPost);
    return response.data;
})


export const { postAdded,  postUpdated, reactionAdded} = postsSlice.actions;
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
    // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(state => state.posts)

export default postsSlice.reducer;