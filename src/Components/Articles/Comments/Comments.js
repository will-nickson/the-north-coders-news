import React, { Component } from "react";
import * as api from "../../../api";
import Error from "../../../Error";
import Voter from "../../Voter";
import { distanceInWords } from "date-fns";

export class Comments extends Component {
  state = {
    comments: [],
    hasError: false,
    loading: true,
    userComment: ""
  };

  render() {
    const { comments, hasError, loading } = this.state;
    const { username } = this.props;

    if (loading) return <p>Loading...</p>;
    if (hasError) return <Error error={hasError} />;

    return (
      <div className="container">
        <div className="input-field col s12 left-align submit-comment-wrapper">
          <form onSubmit={this.addComment} className="">
            <div>
              <input
                type="text"
                name="userComment"
                placeholder="Add comment..."
                value={this.state.value}
                onChange={this.onChange}
              />
            </div>
            <div>
              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
                onChange={this.onChange}
              >
                Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>

        {comments &&
          comments.map(comment => {
            return (
              <div
                className="post col s8 l8 z-depth-1"
                key={comment.comment_id}
              >
                <div className="comment-voting-wrapper z-depth-1">
                  <div className="comment-voting">
                    <Voter
                      votes={comment.votes}
                      comment_id={comment.comment_id}
                    />
                  </div>
                </div>

                <div className="content">
                  <div className="comment-body">
                    <p>{comment.body}</p>
                  </div>
                  <div className="comment-author">
                    Posted {distanceInWords(comment.created_at, new Date())} ago
                    by {comment.author}
                  </div>

                  <div className="comment-delete">
                    {username !== comment.author ? null : (
                      <button
                        onClick={() => this.handleDelete(comment.comment_id)}
                        disabled={username !== comment.author}
                      >
                        <i className="material-icons">delete</i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }

  handleDelete = comment_id => {
    api
      .deleteComment(comment_id)
      .then(comment => {
        this.setState(prevState => {
          return {
            comments: [
              ...prevState.comments.filter(
                comment => comment.comment_id !== comment_id
              )
            ]
          };
        });
      })
      .catch(error => {
        this.setState({ hasError: error, loading: false });
        console.dir(error);
      });
  };

  addComment = event => {
    event.preventDefault();

    const { userComment } = this.state;
    const { article_id, author = "jessjelly" } = this.props;

    api
      .postComment(article_id, author, userComment)
      .then(comment => {
        console.log(comment.body.length);
        if (comment.body.length > 1) {
          this.setState(prevState => {
            return {
              comments: [comment, ...prevState.comments],
              userComment: ""
            };
          });
        } else {
          alert("unable to post comment");
        }
      })
      .catch(error => {
        this.setState({ hasError: error, loading: false });
        console.log(error);
      });
  };

  onChange = event => {
    this.setState({ userComment: event.target.value });
  };

  componentDidMount() {
    const { article_id } = this.props;

    api
      .getComments(article_id)
      .then(comments =>
        this.setState({ comments, loading: false, hasError: false })
      )
      .catch(error => {
        this.setState({ hasError: error, loading: false });
        console.dir(error);
      });
  }
}

export default Comments;
