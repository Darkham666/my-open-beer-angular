module.exports=function($scope,$location,save,$window) {
	
	$scope.user = angular.copy(user.information);
	$scope.mail = "";

	$scope.hasOperations=function(){
		return save.operations.length>0;
	};
	
	$scope.opCount=function(){
		return save.operations.length;
	};
	$scope.buttons=[{caption:"Okay"},{caption:"Annuler",dismiss:"true"}];
	
	var beforeUnload=function(e) {
		if($scope.hasOperations())
			return "Attention, vous allez perdre les modifications("+$scope.opCount()+") non enregistrées si vous continuez...";
	};
	angular.element($window).on('beforeunload',beforeUnload);
	
	$scope.$on("$destroy", function () {
		$window.removeEventListener('beforeunload', beforeUnload);
	});
	
	$scope.connect = function(){
		user.information.posted.mail = $scope.mail;
		user.information.posted.password = $scope.user.password;
		user.getToken();
		$scope.user = user.information;
		$location.path("/");
	};

	$scope.disconnect = function(){
		user.deconnect();
		$scope.user = user.information;
		$scope.mail = "";
		$location.path("/");
	};
};