module.exports=function($scope,config,$location,rest, modalService, $document) {
	$scope.data = {};
	
	if(angular.isUndefined(config.activeBrewery)){
		$location.path("breweries/");
	};

	$scope.activeBrewery=config.activeBrewery;
	
	var beers = "beers/brewery/" + config.activeBrewery.id;
	rest.getAll($scope.data, beers);

	$scope.countBeers = function(){
		if($scope.data[beers] == undefined)
			return 0;
		else{	
			return $scope.data[beers].length;
		}
	};

	$scope.viewBreweries = function(){
		$location.path("breweries/");
	};

	$scope.viewBeers = function(){
		//TODO
	}
}