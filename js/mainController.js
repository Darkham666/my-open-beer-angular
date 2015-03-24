module.exports=function($scope,$location,save,$window, user) {
	
	$scope.user = angular.copy(user.info);
	$scope.Email = "";

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
		user.info.posted.mail = $scope.Email;
		user.info.posted.password = $scope.user.password;
		user.getToken();
		$scope.user = user.info;
		$location.path("/");
	};

	$scope.disconnect = function(){
		user.deconnect();
		$scope.user = user.info;
		$scope.Email = "";
		$location.path("/");
	};
};