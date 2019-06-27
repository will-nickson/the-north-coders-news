import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";
import Error from "../Error";

export class ArticleList extends Component {
  state = {
    articles: [],
    sortBy: null,
    orderBy: null,
    hasError: false,
    loading: true,
    page: 1
  };
  render() {
    const { articles, hasError, loading } = this.state;

    if (loading) return <p>Loading...</p>;
    if (hasError) return <Error error={hasError} />;

    return (
      <div>
        <div className="container section sort-by">
          <ul className="left">
            <button onClick={() => this.setSortBy("created_at")}>
              <li>Date</li>
            </button>
            <button onClick={() => this.setSortBy("comment_count")}>
              <li>Comment</li>
            </button>
            <button onClick={() => this.setSortBy("votes")}>
              <li>Votes</li>
            </button>
            <button onClick={() => this.setOrderBy()}>Asc</button>
            <button onClick={() => this.setOrderBy()}>Desc</button>
            <button onClick={() => this.changePage(-1)}>Prev</button>
            <button onClick={() => this.changePage(1)}>Next</button>
          </ul>
        </div>
        <div className="container section article-list">
          <div className="card z-depth-1">
            <div className="card-content">
              {articles.map((article, index) => {
                return (
                  <ul className="card z-depth-1 article-list" key={index}>
                    <li className="card-content grey-text text-darken-3">
                      <Link to={`/articles/${article.article_id}`}>
                        {article.title}
                      </Link>
                    </li>
                    <li className="card-content grey-text text-darken-3 left">
                      {article.author}
                    </li>
                    <li className="card-content grey-text text-darken-3">
                      ID: {article.article_id}
                    </li>
                  </ul>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  changePage = direction => {
    this.setState(prevState => ({ page: prevState.page + direction }));
  };

  setOrderBy = orderBy => {
    this.setState({ orderBy });
  };

  setSortBy = sortBy => {
    this.setState({ sortBy });
  };

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    const topicChange = prevProps.topic !== this.props.topic;
    const sortByChange = prevState.sortBy !== this.state.sortBy;
    const orderBy = prevState.orderBy !== this.state.orderBy;
    const pageChange = prevState.page !== this.state.page;

    if (topicChange || sortByChange || orderBy || pageChange) {
      console.log("topic or sort has changed");
      this.fetchArticles();
    }
  }

  fetchArticles = () => {
    const { topic } = this.props;
    const { sortBy, page, orderBy } = this.state;

    api
      .getArticles(topic, sortBy, page, orderBy)
      .then(articles =>
        this.setState({ articles, loading: false, hasError: false })
      )
      .catch(error => {
        this.setState({ hasError: error, loading: false });
        console.dir(error);
      });
  };
}

export default ArticleList;