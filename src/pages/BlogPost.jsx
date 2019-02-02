import Butter from 'buttercms';
import Moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

const butter = Butter(process.env.REACT_APP_BUTTER);

class BlogPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    componentDidMount() {
        const slug = this.props.match.params.slug;
        butter.post.retrieve(slug).then((resp) => {
            this.setState({
                loaded: true,
                post: resp.data.data
            });
        });
    }

    render() {
        if (!this.state.loaded) {
            return (
                <p>Loading...</p>
            );
        }

        const post = this.state.post;

        return (
            <div className="post-container">
                <Helmet>
                    <title>{post.seo_title}</title>
                    <meta name="description" content={post.meta_description} />
                    <meta name="og:image" content={post.featured_image} />
                </Helmet>
                <h1>{post.title}</h1>
                <p>{`${post.author.first_name} ${post.author.last_name}`}</p>
                <p>{Moment(post.created).tz('Pacific/Auckland').format('Do MMM YYYY LT z')}</p>
                <div dangerouslySetInnerHTML={{ __html: post.body }} />
            </div>
        );
    }
}

BlogPost.propTypes = {
    match: PropTypes.object
};

export default BlogPost;
