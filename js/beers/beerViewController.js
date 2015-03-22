module.exports=function($scope,config,$location,rest, modalService) {
	$scope.data = {};
	
	if(angular.isUndefined(config.activeBeer)){
		$location.path("beers/");
	};

	$scope.activeBeer=config.activeBeer;

	var brasserie = "breweries/" + config.activeBeer.idBrewery;
	rest.getAll($scope.data, brasserie);

	$scope.viewBeers = function(){
		$location.path("beers/");
	};

	$scope.viewBreweryName = function(){
		return $scope.data[brasserie].name; 
	}

	$scope.viewBrewery = function(){
		if(angular.isDefined($scope.data[brasserie]))
		config.activeBrewery=angular.copy($scope.data[brasserie]);
		config.activeBrewery.reference=$scope.data[brasserie];
		$location.path("breweries/details");
	}
};