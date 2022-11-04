import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const SinglePostPage = ({ match }) => {
    const { postId } = match.params

    const post = useSelector(state =>
        state.posts.find(post => post.id === postId)
    )
   

    if( !post ) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        <section>
            <article className="posts"> 
                <h2>{post.title}</h2>
                <PostAuthor userId = {post.userId}/>
                <TimeAgo timestamp = {post.time} />
                <p className="post-content "> {post.content}</p>   
                <ReactionButtons post = {post}/>
                <Link to={`/editPost/${post.id}`} className="button">
                    Edit Post
                </Link>         
            </article>

            
        </section>
    )
}

export default SinglePostPage;