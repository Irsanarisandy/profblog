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
            <div className="post__container">
                <Helmet>
                    <title>{post.seo_title}</title>
                    <link rel="canonical" href={post.url} />
                    <meta name="author" content={`${post.author.first_name} ${post.author.last_name}`} />
                    <meta name="description" content={post.meta_description} />
                    <meta name="keywords" content={post.tags.map(item => item.name).join(', ')} />

                    <meta property="og:image" content={post.featured_image} />
                    <meta property="og:description" content={post.meta_description} />
                    <meta property="og:site_name" content="ProfBlog (React)" />
                    <meta property="og:title" content={post.title} />
                    <meta property="og:url" content={post.url} />

                    <meta name="twitter:card" content={post.summary} />
                    <meta name="twitter:description" content={post.meta_description} />
                    <meta name="twitter:image" content={post.featured_image} />
                    <meta name="twitter:title" content={post.title} />
                    <meta name="twitter:url" content={post.url} />
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
