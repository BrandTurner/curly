# {{Curly}}

### A lightweight string interpolation tool
-------------------------------------------------

Curly can be used to interpolate data into strings with ease. Use it like this:

```
curly(text, data);
```

`text` is a string that has an interpolation target in it. `data` is an object literal that contains what you want to inject into the string.

```
var str = 'Hello, my name is {{name}}';
var data = {
	name: 'Prakash'
};

var interpolatedString = curly(str, data);
```

This yields:
```
'Hello, my name is Prakash'
```
-------------------------------------------------

There are options you have as well. The default pattern curly searches for takes the form
```
{{\w*}}
```
But if you want to change this you can by altering the Curly (capital 'C') namespace:

```
Curly.regex = // Whatever you want here
```
-------------------------------------------------

### TODO
1. Iterators
2. Validation for changing Curly regex
3. Conflict for curly variable