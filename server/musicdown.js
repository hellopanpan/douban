const http = require('http');
const fs = require('fs')  
var filename = "./public" + "nn"+ ".m4a";  
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