const { template } = require('lodash');
const { Comment } = require('../models');

const commentData = [
  {
    comment_name: 'I love it ',
    user_id: '1',
    post_id: '1'
  },
  {
    comment_name: 'I really enjoyed',
    user_id: '2',
    post_id: '2'
  },
  {
    comment_name: 'This helpped me a lot',
    user_id: '3',
    post_id: '1'
  },
  {
    comment_name: 'Can you add one more like this?',
    user_id: '3',
    post_id: '3'
  },
  {
    comment_name: 'This is the best ever',
    user_id: '4',
    post_id: '2'
  },
  
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
