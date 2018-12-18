const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Memo = require('../models/memo');

router.get('/', ensureAuthenticated, (req, res) => {
	res.redirect('/' + req.user.username);
});

router.get('/:user', ensureAuthenticated, (req, res) => {

	Memo.find({username: req.user.username}, (err, docs) => {
		if(err) return console.log(err);

		res.render('index', {
			userMemos: docs.reverse()
		});

	});
	
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/users/login');
	}
}

module.exports = router;