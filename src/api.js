import axios from "axios";

const request = axios.create({
  baseURL: `https://will-nickson-nc-news.herokuapp.com/api`
});

export const getArticles = (topic, sortBy, orderBy, page) => {
  return request
    .get(`/articles`, {
      params: { topic: topic, sort_by: sortBy, order: orderBy, p: page }
    })
    .then(({ data }) => {
      return data.articles;
    });
};

export const getArticleById = article_id => {
  return request.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getComments = article_id => {
  return request.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const getTopics = topics => {
  return request
    .get(`/topics`, { params: { topics: topics } })
    .then(({ data }) => {
      return data.topics;
    });
};

export const postComment = (article_id, author, userComment) => {
  return request
    .post(`/articles/${article_id}/comments`, {
      username: author,
      body: userComment
    })
    .then(({ data }) => {
      return data.comment;
    });
};

export const patchArticleVotes = (article_id, increment) => {
  return request
    .patch(`/articles/${article_id}`, { inc_votes: increment })
    .then(({ data }) => {
      return data.articles;
    });
};

export const patchCommentVotes = (comment_id, increment) => {
  return request
    .patch(`/comments/${comment_id}`, { inc_votes: increment })
    .then(({ data }) => {
      return data.comments;
    });
};

export const deleteComment = comment_id => {
  return request.delete(`/comments/${comment_id}`).then(({ data }) => {
    return data;
  });
};

export const postArticle = (username, title, body, topic) => {
  return request
    .post(`/articles`, {
      author: username,
      title,
      body,
      topic
    })
    .then(({ data }) => {
      return data.article;
    });
};
