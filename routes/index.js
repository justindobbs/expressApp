var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET app page. */
router.get('/app', function(req, res, next) {
  res.render('app', { title: 'Express',user:'user' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req,res) {
	res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Userlist page. */
router.get('/userlist', function(req,res){
	var db = req.db;
	var collection = db.get('usercollection');

	collection.find({},{},function(e,docs){
		res.render('userlist', {
			"userlist" : docs
		});
	});
});

/* GET New User page. */
router.get('/newuser', function(req,res){
	res.render('newuser', {title: 'Add New User' });
});

/* GET show collection */
router.get('/showCollection', function(req,res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{}, function(e,docs){
		res.render('showCollection', {
			"docs" : docs
		});
	});
});

/* POST to Add User Service */
router.post('/adduser', function(req,res) {
	//Set our internal DB variable
	var db = req.db;
	
	//get our form values. These rely on the "name" attributes
	var userName = req.body.username;
	var userEmail = req.body.useremail;
	
	//Set our collection
	var collection = db.get('usercollection');
	
	//Submit to the DB
	collection.insert({
		"username": userName,
		"email" : userEmail
	}, function (err,doc) {
		if (err) {
			res.send("There was a problem adding to database.");
		}
		else{
			//if it worked, set the header so the address bar doesn't still say /aduser
			res.location('userlist');
			//and forward to success page
			res.redirect("userlist");
		}
	});
});



module.exports = router;
