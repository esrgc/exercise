/*********************************************
	Author  - Joshua Souders
	Company	- ESRGC/GNAppWorks
	Date	- 10/27/13
	Summary	- Initializes the checkboxes
*********************************************/

initializeSelector();

function initializeSelector(){
	$(function(){
	 $(".content").find("div:first").show();
	});
	
	function ShowHide(e){
		$(".tabs").hide();
		var id =$(e).attr("href"); 
		$(id).show();
	}
	
	//takes JSON as input, loops through and adds the checkboxes corresponding to trail names
	function addCheckboxes(elem, items){
		var html="<fieldset data-role='controlgroup'>";
		_.each(items.features, function(features){
			html+='<input type="checkbox" name="'+features.properties.Route_Type+'" id="'+features.id+'" class="custom" /><label for="'+features.id+'">'+features.properties.Route_Name+' - '+features.properties.Dist_Miles+' miles</label>';
		});
		html+='</fieldset>';
		$('#'+elem).html(html);
		$('#'+elem).trigger("create");
	}
	
	//gets the JSON and calls addCheckboxes with the information. references JSONFunctions.js
	var walkrun=getJSON("walkrun").done(function (items) {
		addCheckboxes("walkrun-trails", items);
	});
	
	var bike=getJSON("bike").done(function (items) {
		addCheckboxes("bike-trails", items);
	});
}