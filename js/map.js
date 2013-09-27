/*********************************************
	Author  - Joshua Souders
	Company	- ESRGC/GNAppWorks
	Date	- 10/27/13
	Summary	- Initializes and updates the map
*********************************************/


//map object
var m;

$("#mapPage").on("pageshow",function(event, ui) {
	//creates map if not initilized, refreshes the map if it is
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
		//if init hasn't been run we initialize fully, if it has we just refresh
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

		//this is a plugin, not native Leaflet
		map.addControl( new L.Control.Gps({
			style: 
			{	
				radius: 25, 
				weight:6, 
				color: '#ee0', 
				fill: true, 
				opacity:0.8
			} 
		}));

		//creates a layer group so we can delete all trails at once if needed
		self.layerGroup=L.layerGroup();
		
		self.createModelArray();
	}

	//calls a function to get the JSON files with jQuery, then tells the map to call the funtion to add the right trails
	this.createModelArray=function(){
		var walkrun=getJSON("walkrun").done(function (items) {
			self.addFeatures(items, "walkrun");
		});
		
		var bike=getJSON("bike").done(function (items) {
			self.addFeatures(items, "bike");
		});
	}
	
	//adds trails to the layergroup and then the map given JSON input
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
	
	//creates an array of acceptable colors for the trail lines
	this.initializeColors=function(){
		self.colors = new Array("#00ffff","#000000","#0000ff","#a52a2a","#00008b","#008b8b","#006400","#8b008b","#556b2f","#9932cc","#8b0000","#e9967a","#9400d3","#ff00ff","#ffd700","#008000","#4b0082","#00ff00","#ff00ff","#800000","#000080","#808000","#ffc0cb","#ff0000","#ffff00");
	}
	
	//Loops through and picks an acceptable color for the trail
	this.getColor=function(){
		self.colorIndex++;
		if(self.colorIndex>=self.colors.length){
			self.colorIndex=0;
		}
    	return self.colors[self.colorIndex];
	}
}
