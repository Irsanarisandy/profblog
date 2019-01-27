import Butter from 'buttercms';
import React from 'react';

const butter = Butter(process.env.REACT_APP_BUTTER);

class BlogPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    componentDidMount() {
        let slug = this.props.match.params.slug;
        butter.post.retrieve(slug).then((resp) => {
            this.setState({
                loaded: true,
                post: resp.data.data
            });
        });
    }

    render() {
        if (this.state.loaded) {
            const post = this.state.post;
            return (
                <div>
                    <h1>{post.title}</h1>
                    <div dangerouslySetInnerHTML={{__html: post.body}} />
                </div>
            );
        } else {
            return (
                <div>
                    Loading...
                </div>
            );
        }
    }
}

export default BlogPost;
