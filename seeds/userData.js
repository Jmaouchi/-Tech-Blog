const { User } = require('../models');

const userData = [
  {
    username: 'Jugurta',
    email: 'djigo.maouchi@yahoo.com',
    password: 'Jugurta123'
  },
  {
    username: 'Zaha',
    email: 'Zaha.maouchi@yahoo.com',
    password: 'test123'
  },
  {
    username: 'Nora',
    email: 'nora.yosri@yahoo.com',
    password: 'test123'
  },
  {
    username: 'Ali',
    email: 'ali.daka@yahoo.com',
    password: 'test123'
  },
  {
    username: 'Yuva',
    email: 'yuva.maouchi@gmail.com',
    password: 'test123'
  },
  {
    username: 'Mohand',
    email: 'moh.mohai@yahoo.com',
    password: 'test123'
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
