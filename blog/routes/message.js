var http = require('http'); 
var querystring = require('querystring'); 
function SmsCode() 
{ 
 //发短信 
 this.send = function (req0, res0) 
 { 
  var code = "3212"; 
  var txt = "您的验证码是："+code+"。请不要把验证码泄露给其他人。如非本人操作，可不用理会！"; 
  var data = { 
   account: 'myaccount', 
   password: "mypwd", 
   mobile:"1370000000", 
   content:txt 
  }; 
  data = require('querystring').stringify(data); 
  console.log(data); 
  var opt = { 
   method: "POST", 
   host: "sms.106jiekou.com",//可以用域名,ip地址 
   port: 80, 
   path: "/utf8/sms.aspx", 
   headers: { 
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
   } 
  }; 
  var req = http.request(opt, function (res) 
  { 
   console.log('STATUS: ' + res.statusCode); 
   console.log('HEADERS: ' + JSON.stringify(res.headers)); 
   res.setEncoding('utf8'); 
   res.on('data', function (chunk) 
   { 
    console.log('BODY: ' + chunk); 
   }); 
  }); 
  req.on('error', function (e) { 
   console.log('problem with request: ' + e.message); 
  }); 
  req.write(data);//把请求发出去 
  req.end(); 
 }; 
 //验证码是否正确 
 this.verify = function (req, res) 
 { 
 } 
} 
module.exports = SmsCode;