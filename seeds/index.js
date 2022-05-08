const sequelize = require('../config/connection');
// I know that seeding a user data using this JS method is bad, due to the password that needs to be hashed first befor we can send it to 
// the database, but since i dont have much time, this will work fine for now (i will update it later)
const seedUser = require('./userData');
const seedPost = require('./postData');
const seedComment = require('./commentsData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedPost();

  await seedComment();

  process.exit(0);
};

seedAll();
