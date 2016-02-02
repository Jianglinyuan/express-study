var express = require('express');
var app = express();

var myLogger = function (req,res,next){
	console.log("LOGGED");
	next();
}

var secondLogger = function(req,res,next){
	console.log("the second logger");
	next();
}

/*
	用Use来连接中间件的时候，是词法顺序决定的。	
*/
app.use(secondLogger);
app.get('/',function(req,res){
	res.send('Hello World!');
});
app.use('/user/:id',function(req,res,next){
	console.log("request type:",req.method);
	next();
})
app.get('/user/:id',function(req,res,next){
	res.send('wodiaonilaomei');
})
app.use(myLogger);


app.get('/ab?cd',function(req,res){
	res.send('ab?cd');
})

/**
 * 多个funciton处理一个req.
 */
app.get('/test/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res,next) {
  console.log("the response will be sent by the third funciton");
  next();
},function(req,res){
	res.send('The third res!')
})
/*
	使用route把Http请求连接起来。
 */
app.route('/book').get(function(req,res){
	res.send('get a get req');
}).post(function(req,res){
	res.send('get a post req');
})

app.listen(3000,function(){
	console.log("Your website is listening on port 3000!");
})