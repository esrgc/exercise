function getJSON(file) {
		return $.getJSON(file+".json").then(function (data) {	
				return data;
		});
}