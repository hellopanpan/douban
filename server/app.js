// 引入依赖
var express = require('express')
// 建立 express 实例
var app = express()
var superagent = require('superagent')
var cheerio = require('cheerio')
var url = require('url')
var bodyParser = require('body-parser')
var http = require('http')
var fs = require('fs')
var path = require('path')
var eventproxy = require('eventproxy')

var async = require('async')
let MusicIndex = 1
let numx = 0

// 引入并创建数据库 douban
var mongoose = require('./mongo.js')
const { on } = require('events')
let doubanSchema = new mongoose.Schema({
  //table 模式
  picIndex: {
    type: String,
    default: 'douban'
  },
  piclink: {
    type: String,
    default: 'douban'
  },
  picsrc: {
    type: String,
    default: 'douban'
  },
  title: {
    type: String,
    default: 'douban'
  },
  titlelink: {
    type: String,
    default: 'douban'
  },
  person: {
    type: String,
    default: 'douban'
  },
  rate: {
    type: String,
    default: 'douban'
  }
})
let doubanVideoSchema = new mongoose.Schema({
  //table 模式
  title: {
    type: String,
    default: 'douban'
  },
  picIndex: {
    type: String,
    default: 'douban'
  },
  piclink: {
    type: String,
    default: 'douban'
  },
  start_time: {
    type: String,
    default: 'douban'
  },
  cover: {
    type: String,
    default: 'douban'
  },
  uri: {
    type: String,
    default: 'douban'
  },
  type: {
    type: String,
    default: 'douban'
  }
})
let doubanTimeSchema = new mongoose.Schema({
  //table 模式
  picIndex: {
    type: String,
    default: 'douban'
  },
  piclink: {
    type: String,
    default: 'douban'
  },
  picsrc: {
    type: String,
    default: 'douban'
  },
  title: {
    type: String,
    default: 'douban'
  },
  titlelink: {
    type: String,
    default: 'douban'
  },
  type: {
    type: String,
    default: 'douban'
  }
})
let doubanMusicModel = mongoose.model('doubanMusic', doubanSchema) // doubanMusic 集合名称；集合的结构对象
let doubanVideoModel = mongoose.model('doubanVideo', doubanVideoSchema) // doubanMusic 集合名称；集合的结构对象
let doubanTimeModel = mongoose.model('doubanTime', doubanTimeSchema) // doubanMusic 集合名称；集合的结构对象

// 使用express创建静态服务器
app.use(express.static(path.resolve(__dirname, '../server')))

app.listen(3000, function (req, res) {
  console.log('app is running at port 3000')
})

app.use(bodyParser.json())

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  console.log('connnect---->all')
  next()
})

/**
 * 下载图片
 */
let downPic = (url, name) => {
  console.log('url--', url, name)
  //通过url重新连接服务器，获取图片，将图片写到磁盘上
  http.get(url, function (res) {
    console.log('res--j--')
    res.setEncoding('binary') //转成二进制
    var content = ''
    res
      .on('data', function (data) {
        content += data
      })
      .on('end', function () {
        console.log('end')
        fs.writeFile(
          path.join(__dirname, '/public/' + name + '.jpg'),
          content,
          'binary',
          function (err) {
            if (err) throw err
            console.log('保存完成')
          }
        )
      })
      .on('error', function (e) {
        console.log('eee---', e)
      })
  })
}
/**
 * data获取音乐列表，存入数据
 */
let getMusic = () => {
  numx = 0
  superagent.get('https://www.douban.com/').end(function (err, sres) {
    // 常规的错误处理
    if (err) {
      return next(err)
    }
    var $ = cheerio.load(sres.text)
    var items = []
    $('#anony-music .album-list li').each(function (idx, element) {
      console.log('music-------')
      var $element = $(element)
      let obj = {
        piclink: $element.find('.pic a').attr('href'),
        picsrc: $element.find('.pic a img').attr('data-origin'),
        title: $element.find('.title a').text(),
        titlelink: $element.find('.title a').attr('href'),
        person: $element.find('.artist a').text(),
        rate: $element.find('.rating i').text() || '0'
      }
      items.push(obj)
    })

    // 处理下载图片
    let picArr = items.map((item, index) => {
      const picsrc = item.picsrc.replace('https', 'http')
      const name = 'music' + index
      item.picIndex = '../cross/public/' + name + '.jpg'
      downPic(picsrc, name)
      item.picsrc = picsrc
      return picsrc
    })

    if (items.length > 0) {
      // 删除原有数据
      doubanMusicModel.remove({}, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('remove music success')
        }
      })

      // 插入数据
      doubanMusicModel.create(items, (err) => {
        if (err) {
          console.log('err---', err)
        } else {
          console.log('insert music success')
        }
      })
    }
  })
}

/**
 * data获取影视列表，存入数据库
 */
let getVideo = () => {
  // 取前一列视频数据
  superagent.get('https://www.douban.com/').end((err, sres) => {
    // 常规的错误处理
    if (err) {
      return console.log(err)
    }

    var $ = cheerio.load(sres.text)

    const items = []

    $('#anony-movie .movie-list li').each(function (idx, element) {
      console.log('move------')
      var $element = $(element)
      let obj = {
        piclink: $element.find('.pic a').attr('href'),
        picsrc: $element.find('.pic a img').attr('data-origin'),
        title: $element.find('.title a').text(),
        titlelink: $element.find('.title a').attr('href'),
        person: $element.find('.artist a').text(),
        rate: $element.find('.rating i').text() || '0'
      }
      items.push(obj)
    })

    // 下载替换成本地资源
    items.forEach((item, index) => {
      const picsrc = item.picsrc.replace('https', 'http')
      const name = 'video' + index
      item.picIndex = '../cross/public/' + name + '.jpg'
      downPic(picsrc, name)
      item.picsrc = picsrc
    })

    if (items.length > 0) {
      // 删除原有数据
      doubanVideoModel.remove({}, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('remove Video success')
        }
      })
      // 插入数据
      doubanVideoModel.create(items, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('insert Video success')
        }
      })
    }
  })
}

/**
 * data获取time列表
 */
let getTime = () => {
  superagent.get('https://www.douban.com/').end(function (err, sres) {
    // 常规的错误处理
    if (err) {
      return next(err)
    }

    var $ = cheerio.load(sres.text)
    var items = []
    $('#anony-time .time-list li').each(function (idx, element) {
      var $element = $(element)
      items.push({
        piclink: $element.find('.cover').attr('href'),
        picsrc: $element.find('img').attr('src'),
        title: $element.find('.title').text(),
        titlelink: $element.find('.title').attr('href'),
        type: $element.find('.type').text()
      })
    })

    // 处理下载图片
    items.forEach((item, index) => {
      const picsrc = item.picsrc.replace('https', 'http')
      const name = 'time' + index
      item.picIndex = '../cross/public/' + name + '.jpg'
      downPic(picsrc, name)
      item.picsrc = picsrc
      return picsrc
    })

    if (items.length > 0) {
      // 删除原有数据
      doubanTimeModel.remove({}, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('remove Video success')
        }
      })
      // 插入数据
      doubanTimeModel.create(items, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('insert Video success')
        }
      })
    }
  })
}

/**
 * 获取数据 - base
 */
app.get('/douban/data', (req, res, next) => {
  getVideo(req, res, next)
  getMusic()
  getTime()
  res.send('search all data')
})

/**
 * list time接口
 */
app.get('/douban/time', (req, res, next) => {
  doubanTimeModel.find({}).exec(function (err, respon) {
    if (err) {
      console.log('Error:' + err)
    } else {
      res.send(respon)
    }
  })
})

/**
 * list video接口
 */
app.get('/douban/video', function (req, res, next) {
  console.log('get video--- ')
  doubanVideoModel.find({}).exec(function (err, respon) {
    if (err) {
      console.log('Error:' + err)
    } else {
      res.send(respon)
    }
  })
})

/**
 * list music接口
 */
app.get('/douban/music', function (req, res, next) {
  // 查询已有数据
  doubanMusicModel.find({}).exec(function (err, respon) {
    if (err) {
      console.log('Error:' + err)
    } else {
      console.log('Res:' + respon)
      res.send(respon)
    }
  })
})
app.post('/douban/video/con', function (req, res, next) {
  var obj = req.body
  var objUrl = obj.url
  superagent.get(objUrl).end(function (err, sres) {
    // 常规的错误处理
    if (err) {
      return next(err)
    }
    var $ = cheerio.load(sres.text)
    var item = {
      video:
        $('#player source').attr('src') || $('.video-player video').attr('src'),
      title: $('h1').text()
    }
    res.send(item)
  })
})
app.get('/douban/video/search', function (req, res, next) {
  var obj = req.query
  superagent
    .get('https://www.douban.com/j/search')
    .query(obj)
    .end(function (err, sres) {
      // 常规的错误处理
      if (err) {
        return next(err)
      }
      result = []
      var items = ''
      items = JSON.parse(sres.text)
      for (var i = 0; i < items.items.length; i++) {
        var $ = cheerio.load(items.items[i])
        result.push({
          piclink: $('.pic a').attr('href'),
          picsrc: $('.pic a img').attr('src'),
          title: $('.content h3 a').text(),
          person: $('.content .subject-cast').text(),
          disc: $('p').text(),
          rate: $('.content .rating-info .rating_nums').text()
        })
      }
      res.send(result)
    })
})
