import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
    {id: '1', title: 'First Post!', content: 'Hello!'},
    { id: '2', title: 'Second Post', content: 'More text' }
]

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare (title, content) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content
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
        }
    }
})

export const { postAdded,  postUpdated} = postsSlice.actions;

export default postsSlice.reducer;