import React, { Component } from "react";
import * as api from "../../api";
import { Link } from "@reach/router";
import Error from "../../Error";
import coding from "./img/coding.jpg";
import cooking from "./img/cooking.jpg";
import football from "./img/football.jpg";
import "../../App.css";

export class TopicList extends Component {
  state = {
    topics: [],
    hasError: false,
    loading: true
  };

  render() {
    const { hasError, loading } = this.state;

    if (loading)
      return (
        <div className="container progress">
          <div className="indeterminate" />
        </div>
      );

    if (hasError) return <Error error={hasError} />;

    return (
      <div className="container section topic-list-wrapper">
        {/* {topics.map((topic, index) => {
          return (
            <ul className="card z-depth-1 topic-list-cards" key={index}>
              <li className="card-content">
                <Link className="topic-link" to={`/topics/${topic.slug}`}>
                  {topic.slug}
                </Link>
              </li>
              <li className="card-content">{topic.description}</li>
            </ul>
          );
        })} */}

        <div className="row">
          <div className="col s12 m12">
            <div className="card">
              <div className="card-image">
                <img
                  src={coding}
                  alt="coding"
                  width={500}
                  height={300}
                  // mode={fit}
                />
                <span className="card-title">Coding</span>
              </div>
              <div className="card-content">
                <p>Code is love, code is life</p>
              </div>
              <div className="card-action">
                <Link to="coding">Articles</Link>
              </div>
            </div>

            <div className="card">
              <div className="card-image">
                <img src={cooking} alt="cooking" />
                <span className="card-title">Cooking</span>
              </div>
              <div className="card-content">
                <p>Hey good looking, what you got cooking?</p>
              </div>
              <div className="card-action">
                <Link to="cooking">Articles</Link>
              </div>
            </div>

            <div className="card">
              <div className="card-image">
                <img src={football} alt="football" />
                <span className="card-title">Football</span>
              </div>
              <div className="card-content">
                <p>FOOTIE!</p>
              </div>
              <div className="card-action">
                <Link to="football">Articles</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { topics } = this.props;
    api
      .getTopics(topics)
      .then(topics =>
        this.setState({ topics, loading: false, hasError: false })
      )
      .catch(error => {
        this.setState({ hasError: error, loading: false });
      });
  }
}

export default TopicList;
