var express = require('express');
var router = express.Router();
var models = require('../models/index');
var path    = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user/add', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'user.html'));
});

router.get('/api/user', function(req, res) {
  models.User.findAll({}).then(function(user) {
    res.json(user);
  });
});

router.post('/api/user/add', function(req, res) {
  console.log(req.body.userID)
  models.User.create({
    userID: req.body.userID,
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address
  }).then(function(user) {
    res.json(user);
  });
});

router.put('/api/user/edit', function(req, res) {
  models.User.find({
    where: {
      userID: req.body.userID
    }
  }).then(function(user) {
    if(user){
      user.updateAttributes({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address
      }).then(function(user) {
        res.send(user);
      });
    }
  });
});

router.delete('/api/user', function(req, res) {
  console.log(req.query);
  models.User.destroy({
    where: {
      userID: req.query.userID
    }
  }).then(function(user) {
    res.json(user);
  });
});
module.exports = router;
