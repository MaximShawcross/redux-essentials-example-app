import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setAllPosts, fetchPosts  } from "./postsSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(setAllPosts());

    const postStatus = useSelector(state => state.posts.status);

    useEffect(() => {
        if (postStatus === "idle") {
            dispatch(fetchPosts());
        }
    }, [dispatch, postStatus])
    

    const orderedPosts = posts.slice().sort((a, b) => b.time.localeCompare(a.date));

    const renderedPosts = orderedPosts.map( (post) => {

        return(
            <article className = "post-excerpt" key = {post.id}>
                <h3>{post.title}</h3>
                <div className="">
                    <PostAuthor userId={post.userId} />
                    <TimeAgo timestamp = {post.time} />
                </div>
                <p className="post-content">{post.content.substring(0, 100)}</p>
                <ReactionButtons post = {post}/>
                <Link to={`/posts/${post.id}`} className = "button muted-button">
                    View post            
                </Link>
            </article>
        )
    })

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
      )
}

export default PostsList;
