const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require("../../models");
const { route } = require('./user-routes');


// GET all posts
router.get('/', (req, res) => {
  console.log('======================');
  Comment.findAll({
    attributes: [
      'id',
      'comment_name',
    ],
    include: [
      {
        model: Post,
        attributes: ['title']
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  
});


// GET a sigle comment
router.get('/:id', (req, res) => {
  Comment.findOne({ 

    attributes:[
      'id',
      'comment_name'
    ],
    include: [
      {
        model: Post,
        attributes: ['title']
      },
      {
        model: User,
        attributes: ['username']
      }
    ],

    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})


// post data to the comment table 
router.post('/', (req, res) => {
  // check the session
  if (req.session) {
    Comment.create({
      comment_name: req.body.comment_name,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});



// delete column by id
router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// update a column by id
router.put('/:id', (req, res) => {
  Comment.update(req. body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;