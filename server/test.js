var express = require('express')

// 建立 express 实例
var app = express()

var superagent = require('superagent')
var cheerio = require('cheerio')

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  console.log('connnect---->all')
  next()
})

app.get('/test', (req, res, next) => {
  res.send('test---')
})

app.get('/lianjia', (req, res) => {
  superagent
    .get('https://cd.lianjia.com/ershoufang/pg3co32/')
    .end(function (err, sRes) {
      console.log('sRes--', Object.keys(sRes))

      var $ = cheerio.load(sRes.text)

      let item = []

      $('ul.sellListContent li').each((idx, element) => {
        var $element = $(element)
        item.push({
          title: $element.find('.title').text(),
          img2: $element.find('.lj-lazy').attr('data-original'),
          position: $element.find('.positionInfo').text(),
        })
      })

      console.log(item)
      res.send('item')
    })
})

app.listen(3000, function (req, res) {
  console.log('app is running at port 3000')
})
