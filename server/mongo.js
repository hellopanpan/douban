var mongoose = require("mongoose");
DB_URL = 'mongodb://localhost:27017/mongoosesample';
mongoose.connect(DB_URL);
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
