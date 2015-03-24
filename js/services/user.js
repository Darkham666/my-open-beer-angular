module.exports=function($resource,$location,config,rest) {
	var self = this;

	this.user = {
		mail : "",
		password : "",
		connected : "false",
		token : ""
	};

	this.getToken = function() {
		rest.connect(this.information, function() {
	};

	this.disconnect = function(){
	}

};