import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { postUpdated } from "./postsSlice";
import { selectPostById } from "./postsSlice";

const EditPostComponent = ({ match }) => {
    const { postId } = match.params;
    const post = useSelector(state => selectPostById(state, postId)) ;   

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const dispatch = useDispatch();
    const history = useHistory();

    const onContentChanged = e => setContent(e.target.value);
    const onTitleChanged = e => setTitle(e.target.value);

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postUpdated({
                title,
                content,
                id: postId
            }));
        }

        history.push(`/posts/${postId}`);
    }

    return (
        <section>
            <h2>Edit Post</h2>
        <form>
            <label htmlFor="postTitle">Post Title:</label>
            <input
                type="text"
                id="postTitle"
                name="postTitle"
                placeholder="What's on your mind?"
                value={title}
                onChange={onTitleChanged}
            />
            <label htmlFor="postContent">Content:</label>
            <textarea
                id="postContent"
                name="postContent"
                value={content}
                onChange={onContentChanged}
            />
        </form>
        <button type="button" onClick={onSavePostClicked}>
            Save Post
        </button>
        </section>
    )
}

export default EditPostComponent;