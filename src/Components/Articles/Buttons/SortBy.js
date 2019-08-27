import React from "react";

export default function SortByButtons(props) {
  return (
    <ul className="tabs tabs-transparent">
      <li className="tab">
        <button
          className="btn-small waves-effect waves-light"
          onClick={() => props.setSortBy("created_at")}
        >
          Date
        </button>
      </li>
      <li className="tab">
        <button
          className="btn-small waves-effect waves-light"
          onClick={() => props.setSortBy("comment_count")}
        >
          Comments
        </button>
      </li>
      <li className="tab">
        <button
          className="btn-small waves-effect waves-light"
          onClick={() => props.setSortBy("votes")}
        >
          Votes
        </button>
      </li>
      <li className="tab">
        <button
          className="btn-small waves-effect waves-light"
          onClick={() => props.setOrderBy("asc")}
        >
          Asc
        </button>
      </li>
      <li className="tab">
        <button
          className="btn-small waves-effect waves-light"
          onClick={() => props.setOrderBy("desc")}
        >
          Desc
        </button>
      </li>
    </ul>
  );
}
