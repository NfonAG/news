/**
 * Created by Vadym Yatsyuk on 24.08.17
 */

const Router = require('express').Router;

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
  let sort = getSort(req.query.sort);

  News.find({})
    .sort(sort)
    .execAsync()
    .then(news => {
      res.status(200).json(news);
    })
});

router.get('/:id', (req, res) => {
  News.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(news => {
      if (news) {
        News.populate(news, { path: 'comments' }, (err, news) => {
          if (err) {
            handleError(res, 400)(err);
            return null;
          }
          res.status(200).json(news);
        });
      }
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
    })
    .catch(handleError(res, 400));
});


router.get('/:id/comments', (req, res) => {
  News.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(news => {
      if (!news) {
        return null;
      }

      Comment.findAsync({
        news: news._id
      })
        .then(comments => {
          res.status(200).json(comments);
        })
        .catch(handleError(res, 400));
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

module.exports = router;