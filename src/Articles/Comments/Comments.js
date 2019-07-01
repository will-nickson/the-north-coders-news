import React, { Component } from "react";
import * as api from "../../api";
import Error from "../../Error";
import Voter from "../../Voter";

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
      <div className="container section submit-comment">
        <div className="col s12 m5">
          <div className="row z-depth-1 comment-card">
            <form
              onSubmit={this.addComment}
              className="col s12"
              /* onSubmit=""*/
            >
              <div className="input-field z-depth-1 col s12">
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
              </div>
            </form>
          </div>
        </div>
        <div className="container section comments-list">
          <div className="col s12 m5">
            {comments &&
              comments.map((comment, index) => {
                return (
                  <div className="row z-depth-1 comment-card" key={index}>
                    {/* <div className="col s12 m6"> */}
                    <ul className="card z-depth-0 comment-list">
                      <li>
                        <span className="comment-author">
                          <p>{comment.body}</p>
                        </span>
                      </li>
                      <li>
                        <span className="comment-author">
                          <p className="grey-text">
                            <i className="material-icons">perm_identity</i>
                            {comment.author}
                          </p>
                        </span>
                      </li>
                      <li>
                        <Voter
                          votes={comment.votes}
                          comment_id={comment.comment_id}
                        />
                      </li>
                      {username !== comment.author ? null : (
                        <li>
                          <span>
                            <button
                              onClick={() =>
                                this.handleDelete(comment.comment_id)
                              }
                              disabled={username !== comment.author}
                            >
                              <i className="material-icons">delete</i>
                            </button>
                          </span>
                        </li>
                      )}
                    </ul>
                    {/* </div> */}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }

  handleDelete = comment_id => {
    const { comments } = this.state;

    api
      .deleteComment(comment_id)
      .then(comment => {
        this.setState(prevState => {
          return {
            comments: [
              ...comments.filter(comment => comment.comment_id !== comment_id)
            ]
          };
        });
      })
      .catch(error => console.dir(error));
  };

  addComment = event => {
    event.preventDefault();

    const { userComment } = this.state;
    const { article_id, author = "jessjelly" } = this.props;

    api
      .postComment(article_id, author, userComment)
      .then(comment => {
        this.setState(prevState => {
          return {
            comments: [comment, ...prevState.comments],
            userComment: ""
          };
        });
      })
      .catch(error => console.log(error));
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
