
ROT.UI = {
	NO_LINE : 0,
	SINGLE_LINE: 1, 
	DOUBLE_LINE: 2,
//	TOP_ROW : {
//		NO_LINE : {
//			NO_LINE : {" ", " ", " "},
//			SINGLE_LINE : {" ", " ", " "}, 
//			DOUBLE_LINE : {" ", " ", " "}
//		},
//		SINGLE_LINE : {
//			NO_LINE : "
//		}
//	}
	defaultOptions : {
		backgroundColor : "#000",
		foregroundColor : "#FFF",		
	},
	getOption : function (options, option) {
		var result;
		if (options != null) {
			result = options[option];
		}
		if (result == null) {	
			result = ROT.UI.defaultOptions[option];
		}
		return result;
	}
}

//ROT.UI.defaultOptions.borderLeft = ROT.UI.SINGLE_LINE;
//ROT.UI.defaultOptions.borderRight = ROT.UI.SINGLE_LINE;
//ROT.UI.defaultOptions.borderTop = ROT.UI.SINGLE_LINE;
//ROT.UI.defaultOptions.borderBottom = ROT.UI.SINGLE_LINE;
ROT.UI.defaultOptions.border = ROT.UI.SINGLE_LINE;

ROT.UI.setDefaultOptions = function(options) {
	ROT.UI.defaultOptions = options;
}

ROT.UI.Window = function(layer) {
	this._layer = layer;
	return this;
}
ROT.UI.Window.prototype.remove = function() {
	this._layer.remove();
}

ROT.UI.newWindow = function(display, x, y, width, height, options) {
	if (display === null || width < 3 || height < 3) {
		return null;
	}
	var layer = display.newLayer();
	var window =  new ROT.UI.Window(layer);
	console.log(window);	
	var colorCode = "%c{" + ROT.UI.getOption(options, "foregroundColor") + "}%b{" + ROT.UI.getOption(options, "backgroundColor") + "}";
	var option = ROT.UI.getOption(options, "border");	
	for (var i = 0; i < height; i++) {
		var currentRow = "";
		if (i == 0) {
			if (option == ROT.UI.NO_LINE) {
				currentRow = Array(width).join(" ");
			}
			else if (option == ROT.UI.SINGLE_LINE) {
				currentRow = "\u250C";
				currentRow = currentRow + Array(width - 2).join("\u2500");
				currentRow = currentRow + "\u2510";
			}
			else if (option == ROT.UI.DOUBLE_LINE) {
				currentRow = "\u2554";
				currentRow = currentRow + Array(width - 2).join("\u2550");
				currentRow = currentRow + "\u2557";			
			}
		}
		else if (i == height - 1) {
			if (option == ROT.UI.NO_LINE) {
				currentRow = Array(width).join(" ");
			}
			else if (option == ROT.UI.SINGLE_LINE) {
				currentRow = "\u2514";
				currentRow = currentRow + Array(width - 2).join("\u2500");
				currentRow = currentRow + "\u2518";
			}
			else if (option == ROT.UI.DOUBLE_LINE) {
				currentRow = "\u255A";
				currentRow = currentRow + Array(width - 2).join("\u2550");
				currentRow = currentRow + "\u255D";			
			}			
		}
		else {
			if (option == ROT.UI.NO_LINE) {
				currentRow = Array(width).join(" ");
			}
			else if (option == ROT.UI.SINGLE_LINE) {
				currentRow = "\u2502";
				currentRow = currentRow + Array(width - 2).join(" ");
				currentRow = currentRow + "\u2502";			
			}
			else if (option == ROT.UI.DOUBLE_LINE) {
				currentRow = "\u2551";
				currentRow = currentRow + Array(width - 2).join(" ");
				currentRow = currentRow + "\u2551";			
			}			
		}
		layer.drawText(x, y + i, colorCode + currentRow);
	}
	return window;
}

