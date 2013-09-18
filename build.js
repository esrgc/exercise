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
	
	function addCheckboxes(elem, items){
		var html="<fieldset data-role='controlgroup'>";
		_.each(items.features, function(features){
			html+='<input type="checkbox" name="'+features.properties.Route_Type+'" id="'+features.id+'" class="custom" /><label for="'+features.id+'">'+features.properties.Route_Name+' - '+features.properties.Dist_Miles+' miles</label>';
		});
		html+='</fieldset>';
		$('#'+elem).html(html);
		$('#'+elem).trigger("create");
	}
	
	
	var walkrun=getJSON("walkrun").done(function (items) {
		addCheckboxes("walkrun-trails", items);
	});
	
	var bike=getJSON("bike").done(function (items) {
		addCheckboxes("bike-trails", items);
	});
}