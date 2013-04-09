# Barbamque
Barbamque is a boilerplate builded, on top of some awesome technologies, to enhance the front-end development workflow.

## What it does for you
Barbamque will setup for you the entire development environment, installing all the required tools and fetching the fronted libraries specified in the **component.json** file.

To Setup Barbamque just run

	$ vagrant up

Once the initial setup is completed (it may take several minutes) to use Grunt you need to logging in into Vagrant via ssh.

	$ vagrant ssh

And run Grunt

	$ grunt

To check that everything is working properly point your browser to [http://localhost:1542/temp](http://localhost:1542/temp/), and you should see your website up and running.

### Supported Grunt commands

	grunt default

This is used to compile the source code for development purpose and will output your code in the **temp/** folder.

	grunt watch

Will run the default command all the times you change a file.

	grunt build

Will output the production code — also unifying your *.coffee in one **main.js** file — and output that into the **dist/** folder.

## Thanks for all the goods

### Tools
- [Vagrant](http://www.vagrantup.com/)
- [Grunt](http://gruntjs.com/)
- [Bower](http://twitter.github.io/bower/)
- [CoffeScript](http://coffeescript.org/)
- [Sass](sass-lang.com)
- [Compass](http://compass-style.org/)
- [Jade](http://jade-lang.com/)

### Front-end Libraries
[jquery](http://jquery.com/)
[underscore](http://underscorejs.org/)
[backbone](backbonejs.org)
[pantarhei](https://github.com/federicoweber/pantarhei)
[modernizr](http://modernizr.com/)
[html5shiv](https://github.com/aFarkas/html5shiv)
[json2](https://github.com/douglascrockford/JSON-js)

## ToDo
- create an external .json to load the project configuration into Grunt
- turn it into a global CLI — distributed via npm — with the wollowing features:
	- an init function to boostrap a new project
	- a command wrapper for Bower, Grunt and Vagrant
- add headless testing with [Phantom](http://phantomjs.org/) [Mocha](http://visionmedia.github.io/mocha/) and [Chai](http://chaijs.com/)

## Contributors

- [Igor Giussani](https://github.com/gius80)
- [Federico Weber](http://federicoweber.com)