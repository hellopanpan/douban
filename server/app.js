// 引入依赖
var express = require('express');
// 建立 express 实例
var app = express();
var superagent= require('superagent');
var cheerio= require('cheerio');
var url = require('url');

var eventproxy=require('eventproxy');

var async=require('async');

var mongoose = require("./mongo.js")
	
var Schema = mongoose.Schema;
var UserSchema = new Schema({//table 模式
	index:{
		type:String,
		default: "xioami"
	},
	title:{
		type: String
	},
	href:{
		type: String
	},
	date :{
		type: String
	},
	nowdate:{
		type: String
	}


});	
var User = mongoose.model("UserNew04",UserSchema);//table 
app.listen(3001, function (req, res) {
  console.log('app is running at port 3000');
});

var cnodeUrl = 'https://cnodejs.org/';
app.get('/', function (req, res, next) {
  // 用 superagent 去抓取 https://cnodejs.org/ 的内容
  superagent.get(cnodeUrl)
    .end(function (err, sres) {
      // 常规的错误处理
      if (err) {
        return next(err);
      }
      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
      // 剩下就都是 jquery 的内容了
      var $ = cheerio.load(sres.text);
      var items = [];
      $('#topic_list .topic_title').each(function (idx, element) {		
        var $element = $(element);
        items.push({
          title: $element.attr('title'),
          href: $element.attr('href'),
		  link:url.resolve(cnodeUrl, $element.attr('href'))
        });
      });

      res.send(items);
    });
});



app.get('/eventproxy', function (req, res, next) {
  superagent.get(cnodeUrl)
  .end(function (err, res) {
    if (err) {
      return console.error(err);
    }
    var topicUrls = [];
    var $ = cheerio.load(res.text);
    // 获取首页所有的链接
    $('#topic_list .topic_title').each(function (idx, element) {
      var $element = $(element);
      // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
      // 我们用 url.resolve 来自动推断出完整 url，变成
      // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
      // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
      var href = url.resolve(cnodeUrl, $element.attr('href'));
      topicUrls.push(href);
    });

    console.log(topicUrls);
	
	
	//------------------------------------------------------
	
	// 得到一个 eventproxy 的实例
	var ep = new eventproxy();
	

	// 命令 ep 重复监听 topicUrls.length 次（在这里也就是 40 次） `topic_html` 事件再行动
	ep.after('topic_html', topicUrls.length, function (topics) {
	  // topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair

	  // 开始行动
	  topics = topics.map(function (topicPair) {
		// 接下来都是 jquery 的用法了
		var topicUrl = topicPair[0];
		var topicHtml = topicPair[1];
		var $ = cheerio.load(topicHtml);
		return ({
		  title: $('.topic_full_title').text().trim(),
		  href: topicUrl,
		  comment1: $('.reply_content').eq(0).text().trim(),
		});
	  });

	  console.log('final:');
	  console.log(topics);
	});

	topicUrls.forEach(function (topicUrl) {
	  superagent.get(topicUrl)
		.end(function (err, res) {
		  console.log('fetch ' + topicUrl + ' successful');
		  ep.emit('topic_html', [topicUrl, res.text]);
		});
	});
	
	
	
	
  });
});


app.get('/async', function (req, res, next) {
	var resSend = res ;
	// 并发连接数的计数器
	var concurrencyCount = 0;
	var companyJsonStr = [];
	var fetchUrl = function (url, callback) {
	concurrencyCount++;
	console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url);
	    superagent.get(url)
		.end(function (err, res) {
		  console.log('fetch ' + url + ' successful');
		  var delay = parseInt((Math.random() * 1000) % 2000, 10);
		  //concurrencyCount--;
		  //callback(null, url );
		  var $elem = cheerio.load(res.text);
		  var companyJson=({
			 name: url 
		  });
		  companyJsonStr = {
			  name: 'url:'+url 
		  };
		  setTimeout(function () {
			concurrencyCount--;
			callback(null, companyJson);
		  }, delay);
		});
	};
	
	var urls = [];
	superagent.get(cnodeUrl)
	  .end(function (err, res) {
		if (err) {
		  return console.error(err);
		}
		var $ = cheerio.load(res.text);
		// 获取首页所有的链接
		$('#topic_list .topic_title').each(function (idx, element) {
		  var $element = $(element);
		  // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
		  // 我们用 url.resolve 来自动推断出完整 url，变成
		  // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
		  // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
		  var href = url.resolve(cnodeUrl, $element.attr('href'));
		  urls.push(href);
		});

		//console.log(urls);
		
		async.mapLimit(urls, 5, function (url, callback) {
		  fetchUrl(url, callback);
		}, function (err, result) {
		  console.log('final:');
		  console.log(result);
		  resSend.send(result);
		});
	  });
	

});
var csuUrl = 'http://jobsky.csu.edu.cn/Home/PartialArticleList';
app.get('/csu', function (req, res, next) {
  // 用 superagent 去抓取 https://cnodejs.org/ 的内容
  var pageindex = 1;
  superagent.post(csuUrl)
	.set('Content-Type', 'application/x-www-form-urlencoded')
    .send({pageindex:pageindex,pagesize:15,typeid:1,followingdates:-1})
    .end(function (err, sres) {
		console.log('222');
      // 常规的错误处理
      if (err) {
		console.log(err);
        return next(err);
      }
      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
      // 剩下就都是 jquery 的内容了
      var $ = cheerio.load(sres.text);
      var items = [];
		console.log("111"+sres.text);
      $("tr").each(function (idx, element) {
		console.log('1');
        var $element = $(element);
        items.push({
		  index: idx,
          title: decodeURIComponent($element.find("td a").text()),
          href: $element.find("td a").attr('href'),
		  date:$element.find(".spanDate").html()
        });
      }); 
      res.send(items);
    });
});

app.get('/csuAll', function (req, res, next) {
	var resSend = res ;
	var csuHeadUrl = 'http://jobsky.csu.edu.cn';
	// 并发连接数的计数器
	var concurrencyCount = 0;
	var pageindex = 1;
	var companyJsonStr = [];
	var fetchUrl = function (url, callback) {
	concurrencyCount++;
	console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url);
	    superagent.post(url)
		.set('Content-Type', 'application/x-www-form-urlencoded')
		.send({pageindex:pageindex,pagesize:15,typeid:1,followingdates:-1})
		.end(function (err, xres) {
		  pageindex++;
		  console.log(pageindex);
		  //console.log('fetch ' + url + ' successful');
		  var delay = parseInt((Math.random() * 1000000) % 2000, 10);
		  //concurrencyCount--;
		  //callback(null, url );
		  var $ = cheerio.load(xres.text);
		  //console.log(xres.text);
		  var items = [];
		  $("tr").each(function (idx, element) {
			//console.log('1');
			var $element = $(element);
			var obj= {
			  index: idx,
			  title: decodeURIComponent($element.find("td a").text()),
			  href: csuHeadUrl+$element.find("td a").attr('href'),
			  date:$element.find(".spanDate").html()
			};
			function insert(obj){
				var user = new User(obj);
				user.save(function(err,res){
					if(err){
						console.log("error"+err);
					}else{
						//console.log("res:"+res);
					}
					  
					  
				})
			 };
			 obj.nowdate = new Date().toLocaleDateString();
			 insert(obj);
			 items.push(obj);
		  }); 
		  setTimeout(function () {
			concurrencyCount--;
			callback(null, items);
		  }, delay);
		});
	};
	
	var urls = [];
	for(var i = 0; i <= 20; i++){
		urls.push("http://jobsky.csu.edu.cn/Home/PartialArticleList");
	}
		//console.log(urls);
		
	async.mapLimit(urls, 5, function (url, callback) {
	  fetchUrl(url, callback);
	}, function (err, result) {
	  console.log('final:');
	  //console.log(result);
	  resSend.send(result);
	});
	
});

app.get("/data",function(req,res,next){
	function find(){
		//var wherestr = {'username' : 'Tracy McGrady'};
		//User.find({userage: {$gte: 21, $lte: 65}}, callback);   >=21,<=65
		//正则 var whereStr = {'username':{$regex:/m/i}};
		User.find({"date":"2017.10.22"}).sort({"index": -1}).limit(50).exec(function(err, respon){
			if (err) {
				console.log("Error:" + err);
			}
			else {
				console.log("Res:" + respon);
				res.send(respon);
			}
		})
	}
	find(); 
 
});
app.get("/douban/time",function(req,res,next){
    superagent.get("https://www.douban.com/")
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            // 剩下就都是 jquery 的内容了
            var $ = cheerio.load(sres.text);
            var items = [];
            $("#anony-time .time-list li").each(function (idx, element) {
                var $element = $(element);
                items.push({
                    piclink: $element.find(".cover listen new ").attr('href'),
                    picsrc: $element.find("img").attr('src'),
                    title: $element.find(".title").text(),
					titlelink: $element.find(".title").attr('href'),
					type:  $element.find(".type").text()
                });
            });
            res.send(items);
        });
});
app.get("/douban/video",function(req,res,next){
	var items = [];
    superagent.get("https://m.douban.com/rexxar/api/v2/muzzy/columns/1001/items?start=0&count=3")
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            // 剩下就都是 jquery 的内容了
            items.push(JSON.parse(sres.text));
            superagent.get("https://m.douban.com/rexxar/api/v2/muzzy/columns/10006/items?start=0&count=3")
                .end(function (err, sres) {
                    // 常规的错误处理
                    if (err) {
                        return next(err);
                    }
                    items.push(JSON.parse(sres.text));
                    res.send(items);

                });

        });
})



