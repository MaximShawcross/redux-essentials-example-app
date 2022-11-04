import { createSlice, nanoid } from "@reduxjs/toolkit";
import sub from "date-fns/sub";

const initialState = [
    {id: '1', title: 'First Post!', content: 'Hello!', userId: "1", time: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0} },
    { id: '2', title: 'Second Post', content: 'More text', userId: "2", time: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0} }
];

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload);
            },
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
            const exitingPost = state.find(item => item.id === id);

            if (exitingPost) {
                exitingPost.content = content;
                exitingPost.title = title;
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

export const { postAdded,  postUpdated, reactionAdded} = postsSlice.actions;

export default postsSlice.reducer;