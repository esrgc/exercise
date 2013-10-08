/*********************************************
	Author  - Joshua Souders
	Company	- ESRGC/GNAppWorks
	Date	- 10/27/13
	Summary	- Gets the JSON data, returns it
*********************************************/

function getJSON(file) {
		return $.getJSON("data/"+file+".json").then(function (data) {	
				return data;
		});
}