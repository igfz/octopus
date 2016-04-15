var express = require('express');
var router = express.Router();
var userModel = require('../models/user');

/* list all users. */
router.get('/', function(req, res) {
	userModel.find(function(error, models){
		if(error) return console.error('user find error'+error);
  	res.locals.users = models;
  	res.render('mongolist', { title: '盲果好吃'});
  });
});

/* save user */
router.post('/',function(req, res){
	var model = req.body;
	userModel.create(model,function(error){
		if(error) return console.error('user create error' + error);
		res.redirect('/mongo');
	});
});

/* get user by id */
router.get('/:id',function(req, res){
  userModel.findById(id, function(error, model){
    if(error) return console.error('get user by id error' + error);
		res.json({user:model});
  });
});

/* update user by id */
router.put('/:id',function(req, res){
  var id = req.params.id,
  	model = req.body;
  userModel.findByIdAndUpdate(id, model, function (error) {
    if(error) return console.error('user update error' + error);
    res.json({msg: 'user update success'});
  });
});

/* delete user by id */
router.delete('/:id',function(req, res){
  var id = req.params.id;
  userModel.findByIdAndRemove(id, function(error){
    if(error) return console.error('user delete error' + error);
		res.json({msg:'delete user success'});
  });
});

module.exports = router;
