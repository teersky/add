var express = require('express');
var router = express.Router();
var userSQL = require('../routes/users');
/* GET home page. */
router.get('', function(req, res, next) {
  res.render('result', { id:'', username:'', password:'' });
});

module.exports = router;
