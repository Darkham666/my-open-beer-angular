module.exports=function($resource,$location,config,rest) {
	var self = this;

	this.info = {
		mail : "",
		password : "",
		connected : "false",
		token : "",
		posted : {
			mail : "",
			password : ""
		}
	};

	this.getToken = function() {
		rest.connect(this.info, function() {
			if (self.info.ok.connected) {

				self.info.connected = self.info.receive.connected;
				self.info.mail = self.info.posted.mail;
				self.info.password = self.info.posted.password;
				self.info.token = self.info.ok.token;
			}
		});
	};

	this.disconnect = function() {
		this.info.ok.connected = false;
		this.info.ok.mail = "";
		this.info.ok.password = "";
		this.info.ok.token = "";
		this.information.posted.mail = "";
		this.information.posted.password = "";
	};

};