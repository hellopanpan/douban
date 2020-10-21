const http = require('http')  
const request = require('request')  
const async = require('async')  
const util = require('util')  
const _ = require('lodash')  
const fs = require('fs')  
  
function QingTingFM(chan, id) {  
    this._chan = chan  
    this._id = id  
}  
  
QingTingFM.prototype = {  
    crawl: function () {  
        var url = this.getAjaxUrl()  
        request(url, function (err, res, body) {  
            if (res.statusCode == 200 && err == null) {  
                //将字符串转换为json对象  
                var data = JSON.parse(body);  
                //_.foreach(data, function(i){  
                //    console.log(util.inspect(i, true));  
                //})  
  
                //创建音乐下载目录  
                var musicDir = 'music'  
                if(!fs.existsSync(musicDir)){  
                    fs.mkdirSync(musicDir);  
                }  
  
                //异步下载数据，异步并发下载，最大同时6个并发  
                async.mapLimit(data, 6, function(i, callback){  
                    //只下载一个地址  
                    var filename = musicDir + "/" + i.name + ".m4a";  
                    var ourl = "http://od.qingting.fm"+ i.urls[0];  
                    console.log("开始下载"+ ourl +" 到: "+filename);  
                    download = function(filename, url){  
                        http.get(url, function(res, err){  
                            var buffers = []  
                            res.on('data', function(data){  
                                buffers.push(data);  
                            });  
  
                            res.on('end', function(){  
                               var fileBuffer = Buffer.concat(buffers)  
                                fs.writeFile(filename, fileBuffer,function(err){  
                                   if(err){  
                                       console.error('写入文件失败:' + err)  
                                   }else{  
                                       console.log("成功下载歌曲到:"+filename)  
                                   }  
                                    callback();  
                                });  
                            });  
  
                            res.on("error", function(err){  
                                console.error("下载错误:"+url);  
                                callback();  
                            });  
                        });  
                    }(filename, ourl);  
                }, function(){  
                    //所有的下载处理完成  
                    console.log("耗时:",(new Date()).getTime() - t1)  
                });  
            }else{  
                console.error("下载数据失败")  
            }  
        })  
    },  
  
    getAjaxUrl: function () {  
        return util.format('http://www.qingting.fm/s/vchannels/%s/programs/%s/ajax', this._chan, this._id)  
    },  
}  
  
  
//for in 返回的是索引值  
//for(var i in [10,20,30,40]){  
//    console.log(i);  
//}  
  
//lodash的forEach是对每个元素进行操作  
//_.forEach([10,20,30,40], function(i){  
//    console.log(i);  
//});  
var t1 = (new Date()).getTime()  
qtfm = new QingTingFM(136962, 5745196)  
qtfm.crawl()  