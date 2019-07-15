import React from "react";

export default function SortByButtons(props) {
  return (
    <div>
      <div className="container section article-list-buttons">
        <button
          className="btn-small waves-effect waves-light"
          onClick={() => props.setSortBy("created_at")}
        >
          Date
        </button>
        <button
          className="btn-small waves-effect waves-light"
          onClick={() => props.setSortBy("comment_count")}
        >
          Comment
        </button>
        <button
          className="btn-small waves-effect waves-light"
          onClick={() => props.setSortBy("votes")}
        >
          Votes
        </button>
      </div>
      {/* <div className="container section order-by-buttons">
        <button
          className="btn-small waves-effect waves-light"
          onClick={() => props.setOrderBy("asc")}
        >
          Asc
        </button>
        <button
          className="btn-small waves-effect waves-light"
          onClick={() => props.setOrderBy("desc")}
        >
          Desc
        </button>
      </div> */}
    </div>
  );
}
