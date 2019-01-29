import Butter from 'buttercms';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const butter = Butter(process.env.REACT_APP_BUTTER);

class BlogHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    fetchPosts(page) {
        butter.post.list({ page: page, page_size: 10 }).then((resp) => {
            this.setState({
                loaded: true,
                resp: resp.data
            });
        });
    }

    componentDidMount() {
        const page = this.props.match.params.page;
        this.fetchPosts(page);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.match !== prevState.match) {
            return { match: nextProps.match };
        }

        return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match !== this.props.match) {
            const page = prevProps.match.params.page;
            this.fetchPosts(page);
        }
    }

    render() {
        if (this.state.loaded) {
            const { next_page, previous_page } = this.state.resp.meta;
            return (
                <div className="posts-container">
                    {this.state.resp.data.map((post) => (
                        <div key={post.slug}>
                            <Link to={`/post/${post.slug}`}>{post.title}</Link>
                        </div>
                    ))}
                    <br />
                    <div>
                        {previous_page && <Link to={`/p/${previous_page}`}>Prev</Link>}
                        {next_page && <Link to={`/p/${next_page}`}>Next</Link>}
                    </div>
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

BlogHome.propTypes = {
    match: PropTypes.object
};

export default BlogHome;
