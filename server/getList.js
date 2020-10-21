// 引入依赖
var express = require('express');
// 建立 express 实例
var app = express();
var superagent= require('superagent');
var cheerio= require('cheerio');
var url = require('url');
var bodyParser = require('body-parser');
var http =require('http');
var fs = require('fs');
var eventproxy=require('eventproxy');
var mongoose = require("./mongoList.js")
// 得到一个 eventproxy 的实例
var ep = new eventproxy();
let getNum = 1
let goodSchema = new mongoose.Schema({ //table 模式
	index: {
		type: String,
		default: "1"
	},
	personType: {
		type: String,
		default: "douban"
  },
  getType: {
		type: String,
		default: "douban"
  },
  name: {
    type: String,
    default: "douban"
  },
  idCard: {
    type: String,
    default: "douban"
  },
  company: {
    type: String,
    default: "douban"
  },
});
let goodModel = mongoose.model('good', goodSchema);// doubanMusic 集合名称；集合的结构对象
// 获取全部
let getAll = () => {
  console.log('getList==========')
  // 命令 ep 重复监听 
	ep.bind('topic_html', function () {
    // topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair
    getNum++;
    if (getNum > 426) return
    getList(getNum)
	  // 开始行动
  });
  getList(1)
}
let getList = (page) => {
  console.log('get list')
  try{
    superagent.get(`https://zw.cdzj.chengdu.gov.cn/py/RCAJ/FinalPublicityList.aspx?action=ucFinalPublicity&page=${page}`).end((err, sres) => {
      // 常规的错误处理
      if (err) {
          return next(err);
      };
      let $ = cheerio.load(sres.text);
      let item = []
      $("#ID_ucFinalPublicity_gridView .MCTableTr_Right").each(function (idx, element) {
        // console.log(idx)
        // 各页信息
        let $element = $(element);
        item.push({
          index: $element.find("td").eq(0).text(),
          personType: $element.find("td").eq(1).text(),
          getType: $element.find("td").eq(2).text(),
          name: $element.find("td").eq(3).text(),
          idCard: $element.find("td").eq(4).text().replace(/\s/g, ''),
          company: $element.find("td").eq(5).text(),
        })
      })
      // 插入数据
      goodModel.create(item,(err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('insert name data success')
        }
      })
      setTimeout(() => {
        ep.emit('topic_html')
      }, 1000 * Math.random() + 1000);
      
      console.log('-----continue')
    })
    console.log('数据已载入正常..' + getNum)
  } catch (err) {
    console.log('数据已载入异常..')
  }
  
  
};
// 删除
let remove = (res) => {
  goodModel.remove({}, (err) => {
    if (err) {
      console.log(err)
    } else {
      res.send('remove name success')
    }
  })
} 
let getData = (res) => {
  // 查询已有数据
	goodModel.find({}).exec(function(err, respon){
		if (err) {
			console.log("Error:" + err);
		}
		else {
      console.log("Res: 查询成功");
      
			res.send(respon);
		}
	})
}
app.listen(3001, function (req, res) {
  console.log('app is running at port 3001');
});
// 路由 删除数据
app.get('/remove', (req,res) => {
  remove(res);
  //res.send('get list .....')
})
// 路由： 爬取数据
app.get('/list', (req,res) => {
  getAll();
  res.send('get list .....')
})
// 路由： 获取数据
app.get('/data', (req,res) => {
  getData(res);
  //res.send('get list .....')
})
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	console.log('connnect---->all')
	next();
});
