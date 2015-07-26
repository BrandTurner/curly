// Define namespace for ns related thingz
var Curly = {
	prefix: '{{',
	suffix: '}}',
	pattern: '(\\s*(\\w+)((\\.{1}\\w+)*)\\s*)',
	re: new RegExp('{{(\\s*(\\w+)((\\.{1}\\w+)*)\\s*)}}'),
	lineSep: ' ',
	valSep: '.',
	go: function(text, data) {
		var w = words(text);
		var i = indices(w);
		var it = extractInterpolationTargets(i);
		var refs = extractComponentRefs(it);
		
		var vals = refs.map(function(elem) {
			elem.word = getValue(elem.word, data);
			return elem;
		});

		newWords = vals.map(function(elem) {
			w[elem.index] = elem.word;
			return w;
		});

		return newWords.join(Curly.lineSep);

	}
};

// takes in a line of text and returns a 
// list of words
function words(line) {
	return line.split(Curly.lineSep);
}

// Map each word to its index
function indices(words) {
	return words.map(function(elem, index) {
		return {
			index: index,
			word: elem
		};
	});
}

// test each word to see if it matches the
// interpolation pattern
function extractInterpolationTargets(indices) {
	return indices.filter(function(elem, index) {
		return Curly.re.test(elem.word)	;
	});
}

// get path to value
function extractComponentRefs(intTargets) {
	return intTargets.map(function(elem, index) {
		elem.word = elem.word.replace(Curly.re, '$1');
		return elem;
	});
}

// get value from object
function getValue(objPath, data) {
	var value = data;
	var list = objPath.split(Curly.valSep);
	for (var i = 0; i < list.length; i++) {
    value=value[list[i]];
    if (value===undefined) return undefined;
	}
	return value;
}

