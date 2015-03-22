module.exports=function($scope,config,$location,rest, modalService, $document) {
	$scope.data = {};
	
	if(angular.isUndefined(config.activeBrewery)){
		$location.path("breweries/");
	};

	$scope.activeBrewery=config.activeBrewery;
	
	var biere = "beers/brewery/" + config.activeBrewery.id;
	rest.getAll($scope.data, biere);

	$scope.countBeers = function(){
		if($scope.data[biere] == undefined)
			return 0;
		else{	
			return $scope.data[biere].length;
		}
	};

	$scope.viewBreweries = function(){
		$location.path("breweries/");
	};

	$scope.viewBeers = function(){
		//TODO
	}
}