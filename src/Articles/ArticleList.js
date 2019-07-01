import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";
import Error from "../Error";
import "../App.css";
import { distanceInWords } from "date-fns";

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
      <div className="wrapper">
        <div className="container section article-list-buttons">
          <button
            className="btn-small waves-effect waves-light"
            onClick={() => this.setSortBy("created_at")}
          >
            Date
          </button>
          <button
            className="btn-small waves-effect waves-light"
            onClick={() => this.setSortBy("comment_count")}
          >
            Comment
          </button>
          <button
            className="btn-small waves-effect waves-light"
            onClick={() => this.setSortBy("votes")}
          >
            Votes
          </button>
          <button
            className="btn-small waves-effect waves-light"
            onClick={() => this.setOrderBy()}
          >
            Asc
          </button>
          <button
            className="btn-small waves-effect waves-light"
            onClick={() => this.setOrderBy()}
          >
            Desc
          </button>
          <Link to="/topics/coding">
            <button className="btn-small waves-effect waves-light">
              Coding
            </button>
          </Link>
          <Link to="/topics/football">
            <button className="btn-small waves-effect waves-light">
              Football
            </button>
          </Link>
          <Link to="/topics/cooking">
            <button className="btn-small waves-effect waves-light">
              Cooking
            </button>
          </Link>
        </div>
        <div className="container section article-list-wrapper">
          {articles.map((article, index) => {
            return (
              <div
                className="container grey lighten-2 box article-list-cards"
                key={index}
              >
                <ul className="card z-depth-1 article-list left-align">
                  <li className="card-content grey-text text-darken-3">
                    <Link to={`/articles/${article.article_id}`}>
                      {article.title}
                    </Link>
                  </li>
                  <li className="card-content grey-text text-darken-3">
                    {article.comment_count} comments
                  </li>
                  <li className="card-content grey-text text-darken-3">
                    {article.votes} votes
                  </li>
                  <li className="card-content grey-text text-darken-3">
                    Posted {distanceInWords(article.created_at, new Date())} ago
                    by {article.author}
                  </li>
                </ul>
              </div>
            );
          })}
        </div>

        <div className="container">
          <ul className="pagination">
            <li
              className="btn-small waves-effect waves-light align-left"
              onClick={() => this.changePage(-1)}
            >
              <i className="material-icons">chevron_left</i>
            </li>
            <li
              className="btn-small waves-effect waves-light align-right"
              onClick={() => this.changePage(1)}
            >
              <i className="material-icons">chevron_right</i>
            </li>
          </ul>
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
      .getArticles(topic, sortBy, orderBy, page)
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
