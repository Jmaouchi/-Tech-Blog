const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require("../../models");

// get all users
router.get('/', (req, res) => {
  // this will get all the data from the user table and it will exclude the password for us. 
  // but the password is still visible in the database, so we need to hash it.
  User.findAll({
    // exclude password

    include: [
      {
        model: Post,
        attributes:['title','post_url', 'user_id'],
        include:{
          model: Comment,
          attributes: ['comment_name','user_id', 'post_id']
        }
      },
    ]
  })
  // then send the data to the user as json 
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// get a single user 
router.get('/:id', (req, res) => { 
  // this will give us a sigle data object from the user table, where the id is = to the req.params.id
  User.findOne({
    attributes: { exclude: ['password'] },
      where: {
        // the req.params.id id that id number from the client side, for exmpl a attr type will set to 2 when creating a button tag,
        // then this when we click on it, that attr number we be used as an id here to send data 
        id: req.params.id
      },
      //it will include all the post data from the post table and the comment table 
      include: [
        {
          model: Post,
          attributes:['title','post_url', 'user_id'],
          include:{
            model: Comment,
            attributes: ['comment_name','user_id', 'post_id']
          }
        },
      ]
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// this API route will be used to send the login data to the User table ( the perpose of this is to check if the user data exist in the database)
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }
    //since the password is hashed, we can not check it, cause it will be different in the database
    // what we need to id is to run a function called checkPasswod and then call  bcrypt.compareSync method to hash the password and then compare
    // it, if its the same, then login 
    // this function is in the user table 
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }
    // This gives our server easy access to the user's user_id, username, and a Boolean describing whether or not the user is logged in
    // we always need to create our sessoin before we send a response back 
    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      // this will set in you client side as a cookie and it will check if you logged in or not 
      req.session.loggedIn = true;

    res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
})



// destroy the session to logout from the page
router.post('/logout', (req, res) => {

  if (req.session.loggedIn) {
    req.session.destroy(() => {
      // the 204 response means that the session has successfully been destroyed.
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }

});

// this post is to create a new user // for example someone trying to reate an account need to fill out a form. the data will be sent to the user table
// then send the data back as json 
// this api will be used to create an account 
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  .then(dbUserData => {
    // method will initiate the creation of the session and then run the callback function once complete.
    // this will add the session to the cookie in you client side, then in the fetch post method if the response ok, they will log you in automatically  :/
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
  
      res.json(dbUserData);
    });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// this will update data in the database, for example a user want to update something 
router.put('/:id', (req, res) => {

  // pass in req.body instead to only update what's passed through
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



// this when a user want to delete something, clicking on a button or whatever
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

module.exports = router;
