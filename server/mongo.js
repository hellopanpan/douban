var mongoose = require("mongoose");
DB_URL = 'mongodb://panpan:996685773@localhost:27017/douban?authSource=admin';
mongoose.connect(DB_URL, {useNewUrlParser: true});
mongoose.connection.on('connected', function (err) {  
	if(err){
		console.log(err);
		return;
	}
    console.log('Mongoose connection open to ' + DB_URL);  
}); 
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
}); 
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
}); 

module.exports = mongoose;
