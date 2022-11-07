import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    selectAllPosts,
    fetchPosts,
    selectPostIds,
    selectPostById
  } from './postsSlice'

import { Spinner } from "../../components/Spinner";
import SinglePost from "./SinglePost";

const PostsList = () => {
    const dispatch = useDispatch();
    const orderedPostIds = useSelector(selectPostIds);

    const postStatus = useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error);

    useEffect(() => {
        if (postStatus === "idle") {
            dispatch(fetchPosts());
        }
    }, [dispatch, postStatus]);

    const renderItems = () => {
        if (postStatus === 'loading') {
            return <Spinner text="Loading..." />
        } else if (postStatus === "succeeded") {

            return orderedPostIds.map(postId => (
                <SinglePost key={postId} postId={postId} />
            ))

        } else if (postStatus === 'failed') {
            return <div>{error}</div>
        }
    }

    let content = renderItems();
    
    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {content}
        </section>
      )
}

export default PostsList;
