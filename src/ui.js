
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
		bg : "#000",
		fg : "#FFF",		
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
	var colorCode = "%c{" + ROT.UI.getOption(options, "fg") + "}%b{" + ROT.UI.getOption(options, "bg") + "}";
	var option = ROT.UI.getOption(options, "border");	
	//note on the odd math in the Array(width +/-) calls - see http://stackoverflow.com/questions/1877475/repeat-character-n-times for details
	for (var i = 0; i < height; i++) {
		var currentRow = "";
		if (i == 0) {
			if (option == ROT.UI.NO_LINE) {
				currentRow = Array(width + 1).join(" ");
			}
			else if (option == ROT.UI.SINGLE_LINE) {
				currentRow = "\u250C";
				currentRow = currentRow + Array(width - 1).join("\u2500");
				currentRow = currentRow + "\u2510";
			}
			else if (option == ROT.UI.DOUBLE_LINE) {
				currentRow = "\u2554";
				currentRow = currentRow + Array(width - 1).join("\u2550");
				currentRow = currentRow + "\u2557";			
			}
		}
		else if (i == height - 1) {
			if (option == ROT.UI.NO_LINE) {
				currentRow = Array(width).join(" ");
			}
			else if (option == ROT.UI.SINGLE_LINE) {
				currentRow = "\u2514";
				currentRow = currentRow + Array(width - 1).join("\u2500");
				currentRow = currentRow + "\u2518";
			}
			else if (option == ROT.UI.DOUBLE_LINE) {
				currentRow = "\u255A";
				currentRow = currentRow + Array(width - 1).join("\u2550");
				currentRow = currentRow + "\u255D";			
			}			
		}
		else {
			if (option == ROT.UI.NO_LINE) {
				currentRow = Array(width + 1).join(" ");
			}
			else if (option == ROT.UI.SINGLE_LINE) {
				currentRow = "\u2502";
				currentRow = currentRow + Array(width - 1).join(" ");
				currentRow = currentRow + "\u2502";			
			}
			else if (option == ROT.UI.DOUBLE_LINE) {
				currentRow = "\u2551";
				currentRow = currentRow + Array(width - 1).join(" ");
				currentRow = currentRow + "\u2551";			
			}			
		}
		layer.drawText(x, y + i, colorCode + currentRow);
	}
	return window;
}


ROT.UI.newDialog = function(display, x, y, text, maxWidth, options) {

	// determine what the tokenized string will be
	var tokens = ROT.Text.tokenize(text, maxWidth);
	var width = 0;
	var height = 1;
	while (tokens.length) { /* interpret tokenized opcode stream */
		var token = tokens.shift();
		switch (token.type) {
			case ROT.Text.TYPE_TEXT:
				width = Math.max(width, token.value.length);
			break;

			case ROT.Text.TYPE_NEWLINE:
				height++;
			break;

		}
	}
	
	var window = ROT.UI.newWindow(display, x, y, width + 2, height + 2, options);
	var displayOptions = window._layer._display.getOptions();
	var oldOptions = {};
	for (var p in displayOptions) { oldOptions[p] = displayOptions[p]; }	
	var newOptions = {};
	for (var p in oldOptions) { newOptions[p] = oldOptions[p]; }
	for (var p in options) { newOptions[p] = options[p]; }	
	window._layer._display.setOptions(newOptions);	
	window._layer.drawText(x + 1, y + 1, text, maxWidth);
	window._layer._display.setOptions(oldOptions);
	return window;
}
