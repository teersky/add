var modelUser = require("../model/user")

module.exports=function(app){
	app.get("/",function(req,res,next){
		res.render("index",{title:"Express"});
	});
	app.get("/reg",function(req, res, next){
		res.render("reg",{title:"注册"})
	});
	app.get("/login",function(req, res, next){
		res.render("login",{title:"登录"})
	});
	app.post("/reg", function(req,res,next){
	
		var postDate={
			name:req.body.name,
			password :req.body.psd
		}
		
	
		modelUser.create(postDate, function(err,data){
	
			if(err){
				console.log(err);
			}
			res.send(data);
		});
		
		
		/*if(postDate.name!=''&& postDate.password!=''){
			//res.send(postDate)
		}else{
			res.send("注册失败")
			return;
		}*/
		
	});
	app.get("/loginout",function(req, res, next){
		res.render("error",{title:"退"})
	});
}
