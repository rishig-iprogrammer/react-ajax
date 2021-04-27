import React, { Component } from 'react';
import axios from '../../../axios';
import { Link, Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts : []
    }
    postSelectedHandler = (id) => {
        this.setState({selectedPostId : id})
    }
    componentDidMount(){
        axios.get('/posts')
        .then(response => {
            const posts = response.data.slice(0, 4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author : 'Max'
                }
            })
            this.setState({posts : updatedPosts});
        })
        .catch(error => {
            console.log(error);
        })
    }
    render() {
        let posts = <p style={{textAlign : 'center'}}>Something went wrong!</p>;
        if(!this.state.error) {
            posts = this.state.posts.map( post => {
                return (
                    <Link to={'/posts/' + post.id} key = { post.id }>
                        <Post 
                            title={post.title} 
                            author = { post.author }
                            clicked = {() => this.postSelectedHandler(post.id)}
                        />
                    </Link>
                )
            })
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path ={ this.props.match.url + "/:id" } component={FullPost} />
            </div>
        )
    }
}

export default Posts;