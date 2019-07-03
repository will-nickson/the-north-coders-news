import React, { Component } from "react";
import * as api from "../../api";
import { Link } from "@reach/router";
import Error from "../../Error";
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
      <div className="container">
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
        </div>
        <div className="container section order-by-buttons">
          <button
            className="btn-small waves-effect waves-light"
            onClick={this.setOrderBy}
            value="asc"
          >
            Asc
          </button>
          <button
            className="btn-small waves-effect waves-light"
            onClick={this.setOrderBy}
            value="desc"
          >
            Desc
          </button>
        </div>
        <div className="container section offset-1 topic-sort-buttons">
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
        <div className="row">
          {articles.map((article, index) => {
            return (
              <div className="col s9" key={index}>
                <div className="card z-depth-1 article-list left-align">
                  <div className="card-content grey-text text-darken-3">
                    <span className="card-title">
                      <Link to={`/articles/${article.article_id}`}>
                        {article.title}
                      </Link>
                    </span>
                    <span>
                      Posted {distanceInWords(article.created_at, new Date())}{" "}
                      ago by {article.author}
                    </span>
                  </div>
                  <div className="card-action">
                    <span>{article.comment_count} comments</span>
                    <span>{article.topic}</span>
                  </div>
                  <div className="votes">
                    <span>{article.votes} votes</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="container section pagination-wrapper">
          <ul className="pagination">
            <li
              className="btn-small waves-effect waves-light pagination-left"
              onClick={() => this.changePage(-1)}
            >
              <i className="material-icons">chevron_left</i>
            </li>
            <li
              className="btn-small waves-effect waves-light pagination-right"
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

  setOrderBy = event => {
    this.setState({ orderBy: event.target.value });
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
