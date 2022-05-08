const { template } = require('lodash');
const { Post } = require('../models');

const postData = [
  {
    title: 'javascript for begginers',
    post_url: 'https://www.youtube.com/watch?v=hdI2bqOjy3c&t=2s',
    user_id: '1',
  },
  {
    title: 'HTML from scratch',
    post_url: 'https://www.w3schools.com/html/',
    user_id: '2'
  },
  {
    title: 'CSS from scratch',
    post_url: 'https://www.youtube.com/watch?v=yfoY53QXEnI&t=836s',
    user_id: '3'
  },
  {
    title: 'Node from scratch',
    post_url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4&t=849s',
    user_id: '4'
  },
  {
    title: 'EXPRESS package (node.js)',
    post_url: 'https://www.youtube.com/watch?v=L72fhGm1tfE&t=958s',
    user_id: '1'
  },
  {
    title: 'Sequelize crash course',
    post_url: 'https://www.youtube.com/watch?v=67OhLlFPqFQ',
    user_id: '5'
  },
  {
    title: 'Bootstrap crash course',
    post_url: 'https://www.youtube.com/watch?v=5GcQtLDGXy8&t=690s',
    user_id: '2'
  },
  {
    title: 'Bulma',
    post_url: 'https://www.youtube.com/watch?v=IiPQYQT2-wg',
    user_id: '2'
  },
  {
    title: 'Handlebars Templating Engine',
    post_url: 'https://www.youtube.com/watch?v=1srD3Mdvf50',
    user_id: '1'
  },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
