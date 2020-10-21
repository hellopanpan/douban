var mongoose = require("./mongo.js");
var Schema = mongoose.Schema;
var superagent= require('superagent');
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
	}


});
 var User = mongoose.model("UserNew03",UserSchema);//table 
 var cnodeUrl = "http://localhost:3001/csuAll";
 function sendReqest(){
	superagent.get(cnodeUrl)
	.end(function (err, res) {
		if (err) {
		  return console.error(err);
		};
		var data = JSON.parse(res.text);
		console.log(res.text);
		for (var i = 0; i< data.length ; i++){
			for(var j = 0;j< data[i].length ; j++){
				//insert(data[i][j]);
				console.log(i+""+j);
			}
		}
		console.log(typeof data);
    });
 }

 function insert(obj){
	var user = new User(obj);
	user.save(function(err,res){
		if(err){
			console.log("error"+err);
		}else{
			console.log("res:"+res);
		}
		  
		  
	})
 };
 
 function update(){
	 var user01 = {
		 "username":"namme"
	 };
	 var pas = {
		 "userPwd": "jsfdsjdfdfsda"
	 };
	 User.update(user01,pas,function(err,res){
		 if(err){
			 console.log("err："+err);
		 }else{
			 console.log("res:" + res);
		 }
	 })
	 
 };
// update();
 
 function del(){
    var wherestr = {'username' : 'Tracy McGrady'};
    
    User.remove(wherestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

//del();
/* 
function find(){
    var wherestr = {'username' : 'Tracy McGrady'};
    //User.find({userage: {$gte: 21, $lte: 65}}, callback);   >=21,<=65
	//正则 var whereStr = {'username':{$regex:/m/i}};
    User.find({}, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
} */

function find(){
    //var wherestr = {'username' : 'Tracy McGrady'};
    //User.find({userage: {$gte: 21, $lte: 65}}, callback);   >=21,<=65
	//正则 var whereStr = {'username':{$regex:/m/i}};
    User.find({}).sort({"index": -1}).limit(50).exec(function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}
find(); 
 
 
 