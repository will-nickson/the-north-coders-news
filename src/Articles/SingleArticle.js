import React, { Component } from "react";
import * as api from "../api";
import Comments from "../Articles/Comments/Comments";
import Error from "../Error";
import Voter from "../Voter";
import { distanceInWords } from "date-fns";

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
      <div className="container single-article-wrapper">
        <div className="row">
          <div className="card z-depth-1 col s12 article-card">
            <span className="card-title">
              <p>{article.title}</p>
            </span>
            <div className="card-body">
              <span className="card-content grey-text text-darken-3">
                <p>{article.body}</p>
              </span>
            </div>

            <div className="card-action">
              <span>
                <p>/t/{article.topic}</p>
              </span>
              <span className="card-created-at">
                <p>
                  Posted {distanceInWords(article.created_at, new Date())} ago
                  by {article.author}
                </p>
              </span>

              <Voter votes={article.votes} article_id={article_id} />
              <span className="card grey-text">
                <p>
                  <i className="material-icons">comments</i>
                  {article.comment_count} comments
                </p>
              </span>
            </div>
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
