import Butter from 'buttercms';
import Moment from 'moment-timezone';
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

  fetchPosts = (page) => {
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
    if (!this.state.loaded) {
      return (
        <p>Loading...</p>
      );
    }

    const { next_page, previous_page } = this.state.resp.meta;

    return (
      <div className="posts__container">
        {(previous_page || next_page) &&
          <div className="d-flex justify-content-between posts__navigation">
            {previous_page &&
              <Link to={`/p/${previous_page}`}>
                <span className="posts__navigation-text">Previous Page</span>
              </Link>
            }
            {next_page &&
              <Link to={`/p/${next_page}`}>
                <span className="posts__navigation-text">Next Page</span>
              </Link>
            }
          </div>
        }
        <div className="posts__contents">
          {this.state.resp.data.map((post) => (
            <div key={post.slug} className="posts__pages">
              <Link to={`/post/${post.slug}`}>
                <h1>{post.title}</h1>
              </Link>
              <p className="posts__info">
                {`${post.author.first_name} ${post.author.last_name}`}
              </p>
              <p className="posts__info">
                {Moment(post.created).tz('Pacific/Auckland').format('Do MMM YYYY LT z')}
              </p>
              <p className="posts__info">{post.summary}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

BlogHome.propTypes = {
  match: PropTypes.object
};

export default BlogHome;
