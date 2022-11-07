import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectUserById, selectPostsByUser } from './usersSlice';

const UserPage = ({ match }) => {
    const { userId } = match.params;

    const user = useSelector(state => selectUserById(state, userId));
    //userId become from params
    const postsForUser = useSelector(state => selectPostsByUser(state, userId));

    const postTitles = postsForUser.map(post => (
        <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
    ))

    return (
        <section>
            <h2>{user.name}</h2>

            <ul>{postTitles}</ul>
        </section>
    )
}

export default UserPage;