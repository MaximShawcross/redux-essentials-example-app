import { Link } from "react-router-dom"
import PostAuthor from "./PostAuthor"
import ReactionButtons from "./ReactionButtons"
import TimeAgo from "./TimeAgo"

const SinglePost = ({ post }) => {
    return(
        <article className = "post-excerpt" key = {post.id}>
            <h3>{post.title}</h3>
            <div className="">
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp = {post.time} />
            </div>
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <ReactionButtons post = {post}/>
            <Link to={`/posts/${post.id}`} className = "button muted-button">
                View post            
            </Link>
        </article>
    )
}

export default SinglePost;