const router = require('express').Router();

//get all the routes from the api folder 
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');


router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);


router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
