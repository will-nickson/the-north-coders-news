import React, { Component } from "react";
import * as api from "../api";

class Voter extends Component {
  state = {
    voteChange: 0
  };

  render() {
    const { voteChange } = this.state;
    const { votes } = this.props;
    return (
      <div className="voting-wrapper z-depth-1">
        <button onClick={() => this.handleVote(1)} disabled={voteChange > 0}>
          <i className="material-icons icon-voter">expand_less</i>
        </button>
        <div className="vote-count">{votes + voteChange}</div>
        <button onClick={() => this.handleVote(-1)} disabled={voteChange < 0}>
          <i className="material-icons icon-voter">expand_more</i>
        </button>
      </div>
    );
  }

  handleVote = increment => {
    const { article_id, comment_id } = this.props;
    this.setState(({ voteChange }) => ({
      voteChange: voteChange + increment
    }));
    if (article_id) {
      api.patchArticleVotes(article_id, increment).catch(err => {
        this.setState(({ voteChange }) => ({
          voteChange: voteChange - increment
        }));
      });
    } else if (comment_id) {
      api.patchCommentVotes(comment_id, increment).catch(err => {
        this.setState(({ voteChange }) => ({
          voteChange: voteChange - increment
        }));
      });
    }
  };
}
export default Voter;
