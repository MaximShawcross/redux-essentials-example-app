import React from "react"
import { Link } from "react-router-dom"
import PostAuthor from "./PostAuthor"
import ReactionButtons from "./ReactionButtons"
import TimeAgo from "./TimeAgo"
import { selectPostById } from "./postsSlice"
import { useSelector } from "react-redux"

let SinglePost = ({ postId }) => {
    const post = useSelector(state => selectPostById(state, postId))
    const { id, title, time, user ,content} = post;

    return(
        <article className = "post-excerpt" key = {id}>
            <h3>{title}</h3>
            <div className="">
                <PostAuthor userId={user} />
                <TimeAgo timestamp = {time} />
            </div>
            <p className="post-content">{content.substring(0, 100)}</p>
            <ReactionButtons post = {post}/>
            <Link to={`/posts/${id}`} className = "button muted-button">
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