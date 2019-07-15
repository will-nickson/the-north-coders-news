import React, { Component } from "react";
import * as api from "../../../api";

export class ArticleAdder extends Component {
  state = {
    title: "",
    body: "",
    topic: ""
  };

  render() {
    const { title, body, topic } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Body:
            <input
              type="text"
              name="body"
              value={body}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <input
              type="text"
              name="topic"
              value={topic}
              onChange={this.handleChange}
            />
            {/* change to drop down select maybe? */}
          </label>
          <button />
        </form>
      </div>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    const { title, body, topic } = this.state;
    const { username } = this.props;
    api
      .postArticle(username, title, body, topic)
      .then(article => {
        this.setState({ title: "", body: "", topic: "" });
        this.props.navigate(`/articles/${article.article_id}`);
      })
      .catch(error => {
        this.setState({ hasError: error, loading: false });
        console.log(error);
      });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.state({ [name]: value });
  };
}

export default ArticleAdder;
