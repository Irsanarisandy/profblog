import React from 'react';
import { Helmet } from 'react-helmet';

const Home = () => (
  <div className="jumbotron">
    <Helmet>
      <title>ProfBlog (React)</title>
      <link rel="canonical" href={document.location.href} />

      <meta property="og:url" content={document.location.href} />

      <meta name="twitter:url" content={document.location.href} />
    </Helmet>
    <h1 className="display-5">Hello, everyone!</h1>
    <p className="lead">
      Welcome to ProfBlog, a website for personal blogs.
    </p>
  </div>
);

export default Home;
