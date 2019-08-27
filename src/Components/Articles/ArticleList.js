import React, { Component } from "react";
import * as api from "../../api";
import { Link } from "@reach/router";
import Error from "../../Error";
import { distanceInWords } from "date-fns";
import SortByButtons from "./Buttons/SortBy";
import Voter from "../Voter";

class ArticleList extends Component {
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

    if (loading) return (
      <div className="container progress">
        <div className="indeterminate" />
      </div>
    );
    if (hasError) return <Error error={hasError} />;

    return (
      <div className="container">
        
          <SortByButtons
            setSortBy={this.setSortBy.bind(this.props)}
            setOrderBy={this.setOrderBy.bind(this.props)}
          />

        {articles.map(article => {
          return (
            <div
              className="article-list-post col s8 l8 z-depth-1"
              key={article.article_id}
            >
              <Voter votes={article.votes} article_id={articles.article_id} />
              <div className="article-list-content-wrapper">
                <div className="article-list-icon valign-center">
                  <Link to={`/articles/${article.article_id}`}>
                    <i className="material-icons icon-comment">
                      insert_comment
                    </i>
                  </Link>
                </div>
                <div className="article-list-info">
                  <div className="article-list-title">
                    <Link to={`/articles/${article.article_id}`}>
                      {article.title}
                    </Link>
                  </div>
                  <div className="article-list-topic">
                    t/{article.topic} - Posted{" "}
                    {distanceInWords(article.created_at, new Date())} ago by{" "}
                    {article.author}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="pagination-wrapper">
          <ul className="pagination">
            <li
              className="btn-small waves-effect waves-light pagination-left"
              onClick={() => this.changePage(-1)}
            >
              <i className="material-icons">chevron_left</i>
            </li>
            <li className=/*"active"*/"waves-effect">
              <a href="#!">1</a>
            </li>
            <li className="waves-effect">
              <a href="#!">2</a>
            </li>
            <li className="waves-effect">
              <a href="#!">3</a>
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
    this.setState(prevState => ({ page: prevState.page + direction }))
  };

  setSortBy = sortBy => {
    this.setState({ sortBy })
  };

  setOrderBy = orderBy => {
    this.setState({ orderBy })
  };

  componentDidMount() {
    this.fetchArticles();
  };

  componentDidUpdate(prevProps, prevState) {
    const topicChange = prevProps.topic !== this.props.topic;
    const sortByChange = prevState.sortBy !== this.state.sortBy;
    const orderBy = prevState.orderBy !== this.state.orderBy;
    const pageChange = prevState.page !== this.state.page;

    if (topicChange || sortByChange || orderBy || pageChange) {
      this.fetchArticles();
    }
  };

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
