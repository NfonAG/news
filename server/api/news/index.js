/**
 * Created by Vadym Yatsyuk on 24.08.17
 */

const Router = require('express').Router;
const request = require('request');

const config = require('../../../config');
const News = require('./news.model');
const Comment = require('./comment.model');
const SORT_TYPES = require('./sort-types');

let router = new Router();

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function getSort(sort) {
  if (SORT_TYPES.TOP === sort) {
    return { likes: -1 }
  }

  return { createdAt: -1 };
}

router.get('/', (req, res) => {
  let pageSize = 20;
  let sort = getSort(req.query.sort);
  let page = parseInt(req.query.page, 10) || 1;

  News.find()
    .sort(sort)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .select('_id title nickname likes link comments createdAt')
    .lean()
    .execAsync()
    .then(news => {
      news.forEach(item => {
        item.comments = item.comments.length;
      });

      res.status(200).json(news);
    })
    .catch(handleError(res, 400));
});

router.get('/:id', (req, res) => {
  News.findById(req.params.id)
    .select('_id title nickname likes link comments createdAt')
    .lean()
    .execAsync()
    .then(handleEntityNotFound(res))
    .then(news => {
      if (news) {
        news.comments = news.comments.length;
        res.status(200).json(news);
      }
    })
    .catch(handleError(res, 400));
});

router.get('/:id/comments', (req, res) => {
  let pageSize = 20;
  let page = parseInt(req.query.page, 10) || 1;

  News.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(news => {
      if (!news) {
        return null;
      }

      Comment.find({
        news: news._id,
        parentComment: null
      })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate('comments')
        .execAsync()
        .then(comments => {
          res.status(200).json(comments);
        })
        .catch(handleError(res, 400));
    })
    .catch(handleError(res, 400));
});

router.put('/:id/likes', (req, res) => {
  News.findOneAndUpdate({ _id: req.params.id }, { $inc: { likes: 1 } }, (err, news) => {
    if (err) {
      res.status(400).end();
      return null;
    }

    res.status(200).json(news);
  });
});

router.post('/', (req, res) => {
  News.createAsync({
    title: req.body.title,
    link: req.body.link,
    nickname: req.body.nickname
  })
    .then(news => {
      res.status(200).json(news);
      sendNotification(news);
    })
    .catch(handleError(res, 400));
});



router.post('/:id/comments', (req, res) => {
  News.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(news => {
      if (!news) {
        return null;
      }

      Comment.createAsync({
        nickname: req.body.nickname,
        content: req.body.content,
        news: news._id,
        comments: []
      })
        .then(comment => {

          news.comments.push(comment._id);

          news.saveAsync()
            .then(() => {
              res.status(200).json(comment);
            })
            .catch(handleError(res, 400));
        })
        .catch(handleError(res, 400));
    })
    .catch(handleError(res, 400));
});

router.post('/:id/comments/:commentId', (req, res) => {
  Comment.findOneAsync({ _id: req.params.commentId, news: req.params.id })
    .then(handleEntityNotFound(res))
    .then(parentComment => {
      if (!parentComment) {
        return null;
      }

      Comment.createAsync({
        nickname: req.body.nickname,
        content: req.body.content,
        news: parentComment.news,
        parentComment: parentComment._id,
        comments: []
      })
        .then(comment => {

          parentComment.comments.push(comment._id);

          parentComment.saveAsync()
            .then(() => {
              res.status(200).json(comment);
            })
            .catch(handleError(res, 400));
        })
        .catch(handleError(res, 400));
    })
    .catch(handleError(res, 400));
});

module.exports = router;

function sendNotification(news) {
  request({
    url: 'https://onesignal.com/api/v1/notifications',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      "Authorization": `Basic ${ config.oneSignal.token }`
    },
    body: JSON.stringify({
      app_id: config.oneSignal.app_id,
      contents: { en: `New ite: "${ news.title }"` },
      included_segments: ["All"]
    })
  }, (err, response, body) => {
    if (!err) {

    }
  });
}