var m;

$("#mapPage").on("pageshow",function(event, ui) {
	if(typeof(m)=="undefined"){
		m=new Map();
		m.init();
	}
	else{
		m.createModelArray();
	}
});

function Map(){

	var self=this;
	this.map;
	this.model={};
	this.loaded=false;
	this.layerGroup;
	this.colors;
	this.colorIndex;
	
	this.init=function(){
		if(self.loaded==false){
			self.colorIndex=-1;
			self.initializeMap();
			self.initializeColors();
			loaded=true;
		}
		else{
			self.layerGroup.clearLayers();
			self.createModelArray();
		}
	}
	
	this.initializeMap=function(){
		map = L.map('map').setView([38.3438, -75.60700], 16);
		L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
		}).addTo(map);

		function onLocationFound(e) {
    		var radius = e.accuracy / 2;

		    L.marker(e.latlng).addTo(map);

		    L.circle(e.latlng, radius).addTo(map);
		}

		function onLocationError(e) {
		    alert(e.message);
		}

		map.on('locationfound', onLocationFound);
		map.on('locationerror', onLocationError);




		self.layerGroup=L.layerGroup();
		
		self.createModelArray();
	}
	
	this.createModelArray=function(){
		var walkrun=getJSON("walkrun").done(function (items) {
			self.addFeatures(items, "walkrun");
		});
		
		var bike=getJSON("bike").done(function (items) {
			self.addFeatures(items, "bike");
		});
	}
	
	this.addFeatures=function(model, modelName){
		_.each(model.features, function(features){
			var idVal=features.id;
			if($('input[id='+idVal+'][name='+modelName+']').is(':checked')){
				self.layerGroup.addLayer(L.geoJson(features, {
					style:function(){
						return {color: self.getColor()};
					}
				})).addTo(map);
			}
		});
	}
	
	this.initializeColors=function(){
		self.colors = new Array("#00ffff","#000000","#0000ff","#a52a2a","#00008b","#008b8b","#006400","#8b008b","#556b2f","#9932cc","#8b0000","#e9967a","#9400d3","#ff00ff","#ffd700","#008000","#4b0082","#00ff00","#ff00ff","#800000","#000080","#808000","#ffc0cb","#ff0000","#ffff00");
	}
	
	this.getColor=function(){
		self.colorIndex++;
		if(self.colorIndex>=self.colors.length){
			self.colorIndex=0;
		}
    return self.colors[self.colorIndex];
	}
}
