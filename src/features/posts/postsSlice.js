import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
    posts: [],
    status: "idle",
    error: null
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            //prepare using for prepare our action object to use this on reducer 
            prepare (title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        time: new Date().toISOString(),
                        title,
                        content,
                        userId: userId,
                        reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
                    }
                }
            }
        },
        postUpdated(state, action) {
            const {title, content, id} = action.payload;
            const exitingPost = state.posts.find(item => item.id === id);

            if (exitingPost) {
                exitingPost.content = content;
                exitingPost.title = title;
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array
            state.posts = state.posts.concat(action.payload)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

// should to use with dispatch(setAllPosts)
export const setAllPosts = state => state.posts.posts;
export const setById = ( state, postId ) => {
    return state.posts.posts.find(post => post.id === postId);
}
// async thunk for get initial posts state 
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await client.get('/fakeApi/posts');
    return response.data; 
})


export const { postAdded,  postUpdated, reactionAdded} = postsSlice.actions;

export default postsSlice.reducer;