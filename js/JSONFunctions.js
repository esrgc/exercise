function getJSON(file) {
		return $.getJSON("../data/"+file+".json").then(function (data) {	
				return data;
		});
}