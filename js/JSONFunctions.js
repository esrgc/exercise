function getJSON(file) {
		return $.getJSON("/exercise/data/"+file+".json").then(function (data) {	
				return data;
		});
}