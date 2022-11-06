import React from "react"
import { Link } from "react-router-dom"
import PostAuthor from "./PostAuthor"
import ReactionButtons from "./ReactionButtons"
import TimeAgo from "./TimeAgo"

let SinglePost = ({ post }) => {
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

// simple methods help us to refuse re-render every SinglePost after click on smiles.
// This memoized out item of an array, that help us to avoid react rool, 
// that says if react parent component was re-rendered, evety child component will
// re-render too. With this syntax we will re-render just that component, that realy 
// needs to be re-rendered
SinglePost = React.memo(SinglePost);

export default SinglePost;