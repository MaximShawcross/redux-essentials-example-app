import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import Navbar  from './Navbar'
import PostsList from '../features/posts/PostsList';
import AddPostForm from '../features/posts/AddPostsForm';
import SinglePostPage from '../features/posts/SinglePostPage';
import EditPostComponent from '../features/posts/EditPostComponent';
import UsersList from '../features/users/UsersList';
import UserPage from '../features/users/UserPage';
import { NotificationsList } from '../features/notifications/NotificationListComponent';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="App">
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <section>
                                <AddPostForm/>
                                <PostsList/>                            
                            </section>

                        )}
                    />
                    <Route exact path = "/editPost/:postId" component = {EditPostComponent} />
                    <Route exact path = "/posts/:postId" component = {SinglePostPage} />
                    <Route exact path = "/users" component = {UsersList} />
                    <Route exact path = "/users/:userId" component = {UserPage} />
                    <Route exact path="/notifications" component={NotificationsList} /> 
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}

export default App;