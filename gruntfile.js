var fs = require('fs');

/*global module:false*/
module.exports = function(grunt) {
	// import libs
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	var data = require('./data');

	var project = {
		title: 'Barbamque',
		author: 'vanGoGH',
		description: '',
		version: '0.1.0',
		analytics: false
	};

	var coffeeSourcesNames = [
		'main'
	]

	var coffeeSources = []
	coffeeSourcesNames.forEach(function(el){
		coffeeSources.push('src/scripts/'+el+'.coffee')
	});
	
	// Declare files to copy
	var filesToCopyDev = {
			"temp/app/js/libs/modernizr.js": "components/modernizr/modernizr.js",
			"temp/app/js/libs/html5shiv.js": "components/html5shiv-dist/html5shiv.js",
			"temp/app/js/libs/jquery.js": "components/jquery/jquery.js",
			"temp/app/js/libs/json2.js": "components/json2/json2.js",
			"temp/app/js/libs/html5shiv-printshiv.js": "components/html5shiv-dist/html5shiv-printshiv.js",
			"temp/app/js/libs/underscore.js": "components/underscore/underscore.js",
			"temp/app/js/libs/backbone.js": "components/backbone/backbone.js",
			"temp/app/js/libs/pantarhei.js": "components/pantarhei/PantaRhei.js",
			"temp/app/js/libs/marionette.js": "components/marionette/lib/backbone.marionette.js",
			"temp/app/js/libs/": "src/scripts/libs/**/*",
			"temp/app/css/img/": "src/styles/img/**/*",
			"temp/app/css/backgroundsize.min.htc": "src/styles/backgroundsize.min.htc",
			"temp/app/img/": "src/img/**/*",
			"temp/app/data/": "src/data/*",
		};

	var filesToCopyDist = {}
	for (var key in filesToCopyDev) {
		filesToCopyDist[key.replace(/^temp/,'dist')] = filesToCopyDev[key]
	};

	// Project configuration.
	grunt.initConfig({
		meta: {
			banner: '/*! <%= project.title %> - v<%= project.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'Copyright (c) <%= grunt.template.today("yyyy") %> <%= project.author %>;*/'
		},
		compass: {
			dev: {
				options : {
					sassDir: 'src/styles',
					cssDir: 'temp/app/css',
				}
			},
			dist: {
				options : {
					sassDir: 'src/styles',
					cssDir: 'dist/app/css',
				}
			}
		},
		coffee: {
			dev: {
				expand: true,
				cwd: 'src/scripts',
				src: ['**/*.coffee'],
				dest: 'temp/app/js',
				ext: '.js'
			},
			dist: {
				options: {
					join: true
				},
				files : {
					'dist/app/js/main.js': coffeeSources
				}
			}
		},

		jade: {
			dev: {
				options: {
					pretty: true,
					data: {
						project: project,
						data: data,
						develop: true,
						coffeeSourcesNames: coffeeSourcesNames,
					}
				},
				files: {
					"temp/index.html": "src/templates/index.jade",
				}
			},
			dist: {
				options: {
					pretty: false,
					data: {
						project: project,
						data: data,
						develop: false,
					}
				},
				files: {
					"dist/index.html": "src/templates/index.jade",
				}
			}
		},
		watch: {
			scripts: {
				files: [
					'src/scripts/**/*.coffee',
					'src/templates/**/*.jade',
					'src/styles/**/*',
					'src/fonts/*',
					'src/img/*',
				],
				tasks: ['default'],
				options: {
					interrupt: true,
					debounceDelay: 250
				}
			}
		},
		copy: {
			flatten: false,
			dev: {
				files: filesToCopyDev
			},
			dist: {
				files: filesToCopyDist
			}
		},
		clean: {
			temp: 'temp/**/*',
			dist: 'dist/**/*',
		}

	});


	// Default task.
	grunt.registerTask('default', ['clean:temp','compass:dev','coffee:dev','jade:dev','copy:dev']);
	grunt.registerTask('build', ['clean:dist','compass:dist','coffee:dist','jade:dist','copy:dist']);
};
