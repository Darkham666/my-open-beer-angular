module.exports=function($scope,rest,$timeout,$location,config,$route,save) {
	$scope.data={load:false};

	$scope.sortBy={field:"name",asc:false};
	
	$scope.messages=rest.messages;
	
	if(config.beers.refresh==="all" || !config.beers.loaded){
		$scope.data.load=true;
		rest.getAll($scope.data,"beers");
		config.beers.loaded=true;
	}else{
		$scope.data["beers"]=config.beers.all;
	}
	$scope.allSelected=false;
	
	$scope.selectAll=function(){
		angular.forEach($scope.data.beers, function(value, key) {
			value.selected=$scope.allSelected;
		});
	};
	
	$scope.refresh=function(){
		save.executeAll();
	}
	
	$scope.showUpdate=function(){
		return angular.isDefined($scope.activeBrewery);
	};
	
	$scope.refreshOnAsk=function(){
		return config.beers.refresh == 'ask';
	};
	
	$scope.defferedUpdate=function(){
		return config.beers.update == 'deffered';
	};
	
	$scope.setActive=function(brewery){
		if(brewery!==$scope.activeBrewery)
			$scope.activeBrewery=brewery;
		else
			$scope.activeBrewery=undefined;
	};
	
	$scope.isActive=function(brewery){
		return brewery==$scope.activeBrewery;
	};
	
	$scope.hasMessage=function(){
		return rest.messages.length>0;
	};
	
	$scope.readMessage=function(message){
		$timeout(function(){
			message.deleted=true;
		},5000);
		return true;
	}
	
	$scope.countSelected=function(){
		var result=0;
		angular.forEach($scope.data.beers, function(value, key) {
			if(value.selected && !value.deleted)
				result++;
		});
		return result;
	};
	
	$scope.hideDeleted=function(){
		$scope.mustHideDeleted=!$scope.mustHideDeleted;
		angular.forEach($scope.data.beers, function(value, key) {
			if($scope.mustHideDeleted){
				if(value.flag==='Deleted')
					value.deleted=true;
			}else{
				value.deleted=false;
			}
		});
	};
	
	$scope.edit=function(brewery){
		if(angular.isDefined(brewery))
			$scope.activeBrewery=brewery;
		config.activeBrewery=angular.copy($scope.activeBrewery);
		config.activeBrewery.reference=$scope.activeBrewery;
		$location.path("beers/update");
	}
	
	$scope.update=function(brewery,force,callback){
		if(angular.isUndefined(brewery)){
			brewery=$scope.activeBrewery;
		}
		$scope.data.posted={ "brewery" : {
		    "name" : brewery.name,
		    "url"  : brewery.url
		  }
		};
		$scope.data.beers.push(brewery);
		brewery.created_at=new Date();
			if(config.beers.update==="immediate" || force){
				rest.post($scope.data,"beers",brewery.name,callback);
			}else{
				save.addOperation("New",$scope.update,brewery);
				$location.path("beers");
			}
	}
	
	$scope.remove=function(){
		angular.forEach($scope.data.beers, function(value, key) {
			if(value.selected){
				$scope.removeOne(value);
			}
		});
		return true;
	};
	$scope.removeOne=function(brewery,force,callback){
		if(config.beers.update==="immediate" || force){
			brewery.deleted=true;
			rest.remove(brewery,"beers",callback);
		}else{
			save.addOperation("Deleted",$scope.removeOne,brewery);
			brewery.deleted=$scope.hideDeleted;
		}
	}
};