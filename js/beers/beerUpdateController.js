module.exports=function($scope,config,$location,rest,save,$document,modalService,$controller){
	$controller('BeerAddController', {$scope: $scope});

	if(angular.isUndefined(config.activeBeer)){
		$location.path("beers/update");
	}
	$scope.activeBeer=config.activeBeer;
	
	$scope._update=function(Beer,force,callback){
		var result=false;
		if($scope.frmBeer.$dirty){
			if(angular.isUndefined(Beer)){
				Beer=$scope.activeBeer;
			}else{
				config.activeBeer=angular.copy(Beer);
				config.activeBeer.reference=Beer;
			}
			$scope.data.posted={ "Beer" : {
			    "name" : Beer.name,
			    "description"  : Beer.description
			  }
			};
			
			config.activeBeer.reference.name=$scope.activeBeer.name;
			config.activeBeer.reference.description=$scope.activeBeer.description;
			config.activeBeer.reference.updated_at=new Date();
			
			if(config.beers.update==="immediate" || force)
				rest.put(config.activeBeer.id,$scope.data,"beers",config.activeBeer.name,callback);
			else{
				config.activeBeer.reference.flag="Updated";
				save.addOperation("Updated",$scope.update,config.activeBeer.reference);
				result=true;
			}
		}else{
			result=true;
		}
		return result;
	}
};