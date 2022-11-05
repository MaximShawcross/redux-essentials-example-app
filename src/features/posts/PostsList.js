import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setAllPosts, fetchPosts  } from "./postsSlice";

import { Spinner } from "../../components/Spinner";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import SinglePost from "./SinglePost";

const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(setAllPosts);

    const postStatus = useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error)

    useEffect(() => {
        if (postStatus === "idle") {
            dispatch(fetchPosts());
        }
    }, [dispatch, postStatus]);

    const renderItems = () => {
        if (postStatus === 'loading') {
            return <Spinner text="Loading..." />
        } else if (postStatus === "succeeded") {
            const orderedPosts = posts
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date))
    
            return orderedPosts.map(post => (
                <SinglePost key={post.id} post={post} />
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
