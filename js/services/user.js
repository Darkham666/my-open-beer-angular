module.exports=function($resource,$location,config,rest) {
	var self = this;

	this.info = {
		mail : "Unidentified",
		password : "",
		connected : "false",
		posted : {
			mail : "",
			password : ""
		},
		setting : false,
		token : ""
	};

	this.getToken = function() {
		rest.connect(this.info, function() {
			if (self.info.ok.connected) {

				self.info.connected = self.info.ok.connected;
				self.info.mail = self.info.posted.mail;
				self.info.password = self.info.posted.password;
				self.info.token = self.info.ok.token;
				self.info.setting = false;

				config.server.privateToken = self.info.ok.token;
			}
		});
	};

	this.disconnect = function() {
		this.info.connected = false;
		this.info.ok.mail = "Unidentified";
		this.info.ok.password = "";
		this.info.ok.token = "";
		this.info.posted.mail = "";
		this.info.posted.password = "";
		this.info.ok.token = "";
		this.info.ok.connected = false;
		
		config.server.privateToken = "";
	};

};