import React, { Component } from "react";
import * as api from "../../api";
import Comments from "../Articles/Comments/Comments";
import Error from "../../Error";
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
      <div className="container">
        <div className="post col s8 l8 z-depth-1">
          <div className="single-article-voting-wrapper z-depth-1">
            <div className="single-article-voting">
              <Voter votes={article.votes} article_id={article_id} />
            </div>
          </div>

          <div className="content">
            <div className="title">{article.title}</div>
            <div className="body">
              <p>{article.body}</p>
            </div>
            <div className="topic">
              t/{article.topic} - Posted{" "}
              {distanceInWords(article.created_at, new Date())} ago by{" "}
              {article.author}
            </div>
          </div>
        </div>

        <div className="comments-wrapper">
          <div className="comments">
            <Comments article_id={article_id} username={username} />
          </div>
        </div>
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
