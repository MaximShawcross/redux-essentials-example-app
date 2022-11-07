import { useState } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { selectAllUsers } from '../users/usersSlice';
import { addNewPost } from './postsSlice';


const AddPostForm = () => {
    //states for form
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const dispatch = useDispatch();

    const users = useSelector(selectAllUsers);

    //methods for changings state
    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onUserIDChanged = e => setUserId(e.target.value);
    
    //validation
    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === "idle";
    
    // method for dispatching new post. Updated, added user id
    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                await dispatch(addNewPost({ title, content, user: userId })).unwrap();
                setTitle('');
                setContent('');
                setUserId('');
            } catch (err) {
                console.error('Failed to save the post: ', err);
            } finally {
                setAddRequestStatus("idle");
            }
        }
    }

    //option for dropdown
    const userOptions = users.map(item => {
        return (
            <option key = {item.id} value = {item.id}>
                {item.name}
            </option>
        )
    })

    return (
        <section>
            <h2>Add a New Post</h2>
            <form >
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor"></label>
                <select name="postAuthor" id="postAuthor" onChange={ onUserIDChanged }>
                    <option value=""></option>
                    {userOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button type = "button" disabled = {!canSave} onClick = { onSavePostClicked }>Save Post</button>
            </form>
        </section>
    )
}

export default AddPostForm;