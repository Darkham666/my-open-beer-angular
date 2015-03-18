module.exports=function() {
	var factory={breweries:{},beers:{},server:{}};
	factory.activeBrewery=undefined;
	factory.breweries.loaded=false;
	factory.breweries.refresh="all";//all|ask
	factory.breweries.update="immediate";//deffered|immediate
	factory.server.privateToken="";
	factory.server.restServerUrl="http://127.0.0.1/Projects/rest-open-beer/";
	factory.server.force=false;
	return factory;
};