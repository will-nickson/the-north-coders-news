import React, { Component } from "react";
import { Router } from "@reach/router";
import NavBar from "./NavBar/NavBar";
import ArticleList from "./Articles/ArticleList";
import SingleArticle from "./Articles/SingleArticle";
import TopicList from "./Topics/TopicList";
import ArticleAdder from "./Articles/ArticleAdder/ArticleAdder";
import Footer from "./Footer/Footer";
import Error from "../Error";
import "../App.css";

class App extends Component {
  state = {
    loggedInUser: {
      username: "jessjelly",
      avatar_url:
        "https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg",
      name: "Jess Jelly"
    }
  };

  render() {
    const { loggedInUser } = this.state;

    return (
      <div className="App">
        <NavBar username={loggedInUser.username} />
        <Router>
          <TopicList path="/topics" username={loggedInUser.username} />
          <ArticleList path="/" username={loggedInUser.username} />
          <ArticleList path="/topics/:topic" username={loggedInUser.username} />
          <SingleArticle
            path="/articles/:article_id"
            username={loggedInUser.username}
          />
          <ArticleAdder
            path="/articles/post"
            username={loggedInUser.username}
          />
          <Error default />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
