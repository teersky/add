var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/usersql');
var pool = mysql.createPool(dbConfig.mysql);
/* GET home page. */
router.get('', function(req, res, next) {
  res.render('login', {});
});
module.exports = router;
