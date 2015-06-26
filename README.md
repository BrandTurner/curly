## Gulp Boilerplate

#### A ready-to-go template for gulp projects

### TODO
1. Sensibly concatenate JS and CSS files (separately)
	- The problem is that while component files reference component scripts, the built app will have only one concatenated file. So should components reference the expected concatenated file? Or should the build process transform the component dependency path?

	- gulp-data is key here. If it works the filepaths can be piped in depending on the production environment.

2. Promises
	- Q vs. Bluebird
	- Babel

3. Dependencies
	- Should they be listed in a json somewhere?
	- glob?
	
4. Pwnage