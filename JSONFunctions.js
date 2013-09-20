function getJSON(file) {
		return $.getJSON("JSON/"+file+".json").then(function (data) {	
				return data;
		});
}