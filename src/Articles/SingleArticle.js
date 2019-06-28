import React, { Component } from "react";
import * as api from "../api";
import Comments from "../Articles/Comments/Comments";
import Error from "../Error";
import Voter from "../Voter";

export class SingleArticle extends Component {
  state = {
    article: {},
    hasError: false,
    loading: true
  };

  render() {
    const { article, hasError, loading } = this.state;
    const { article_id, username } = this.props;

    if (loading) return <p>Loading...</p>;
    if (hasError) return <Error error={hasError} />;

    return (
      <div className="container section single-article">
        <div className="row z-depth-1 article-card">
          <div className="col s12 m6">
            <ul className="card z-depth-0 article-list">
              <span className="card-title">
                <p>{article.title}</p>
              </span>
              <span className="card-body">{article.body}</span>
              <span className="card-topic">
                <p>{article.topic}</p>
              </span>
              <span className="card-created-at">
                <p>{article.created_at}</p>
              </span>
              <Voter votes={article.votes} article_id={article_id} />
              <p className="grey-text">
                <i className="material-icons">comments</i>
                {article.comment_count}
              </p>
              <p className="grey-text">
                <i className="material-icons">perm_identity</i>
                {article.author}
              </p>
            </ul>
          </div>
        </div>
        <Comments article_id={article_id} username={username} />
      </div>
    );
  }

  componentDidMount() {
    const { article_id } = this.props;

    api
      .getArticleById(article_id)
      .then(article =>
        this.setState({ article, loading: false, hasError: false })
      )
      .catch(error => {
        this.setState({ hasError: error, loading: false });
        console.dir(error);
      });
  }
}

export default SingleArticle;
