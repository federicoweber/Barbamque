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

	var project = grunt.file.readJSON('package.json')
	project.analytics = false

	var coffeeSourcesNames = [
		'main'
	]

	var coffeeSources = []
	coffeeSourcesNames.forEach(function(el){
		coffeeSources.push('src/scripts/'+el+'.coffee')
	});
	
	// Declare files to copy
	var filesToCopyDev = [
		{flatten: true, dest: "temp/app/js/libs/modernizr.js", src: "components/modernizr/modernizr.js"},
		{flatten: true, dest: "temp/app/js/libs/html5shiv.js", src: "components/html5shiv-dist/html5shiv.js"},
		{flatten: true, dest: "temp/app/js/libs/html5shiv-printshiv.js", src: "components/html5shiv-dist/html5shiv-printshiv.js"},
		{flatten: true, dest: "temp/app/js/libs/jquery.js", src: "components/jquery/jquery.js"},
		{flatten: true, dest: "temp/app/js/libs/json2.js", src: "components/json2/json2.js"},
		{flatten: true, dest: "temp/app/js/libs/underscore.js", src: "components/underscore/underscore.js"},
		{flatten: true, dest: "temp/app/js/libs/backbone.js", src: "components/backbone/backbone.js"},
		{flatten: true, dest: "temp/app/js/libs/pantarhei.js", src: "components/pantarhei/PantaRhei.js"},
		{flatten: true, expand: true, dest: "temp/app/js/libs/", src: "src/scripts/libs/**/*"},
		{flatten: true, expand: true, dest: "temp/app/css/img/", src: "src/styles/img/*"},
		{flatten: true, expand: true, dest: "temp/app/css/img/", src: "components/jquery.colorbox/example1/images/*"},
		{flatten: true, expand: true, dest: "temp/app/fonts/", src: "src/fonts/*"},
		{flatten: true, expand: true, dest: "temp/app/images/", src: "src/images/*"},
		{flatten: true, dest: "temp/app/data/", src: "src/data/*"}
	];

	var filesToCopyDist = []
	filesToCopyDev.forEach(function(el){
		el1 = {
			flatten: el.flatten,
			dest: el.dest.replace(/^temp/,'dist'),
			src: el.src,
			expand : el.expand != undefined ? true : false
		}
		filesToCopyDist.push(el1)
	});

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

	// update version number in package json
	grunt.registerTask('updateVersion', function(){
		// this is used to check if a version number have been provided
		var tag = grunt.option('tag')
		if(tag){
			var exec = require('child_process').exec
			var package = grunt.file.readJSON('package.json');
			var oldVersion = package.version;
			package.version = tag
			grunt.file.write('package.json', JSON.stringify(package, null, 4));
			grunt.log.write('Version changed from: '+oldVersion+' to: '+tag+' … ').ok();
			exec("git tag "+tag);
		} else {
			grunt.fail.warn('A version number is needed')
		}
		
	});

	// push the updates to the server
	grunt.registerTask('appendBanner', function(){
		var pkg = grunt.file.readJSON('package.json');
		var banner = '/* '+pkg.title+' by: '+pkg.author+' — v.'+pkg.version+' — date:'+new Date()+'*/'
		fs = require('fs')
		fs.appendFileSync('dist/app/css/style.css', banner);
		fs.appendFileSync('dist/app/js/main.js', banner);

	});

	// Default task.
	grunt.registerTask('default', ['clean:temp','compass:dev','coffee:dev','jade:dev','copy:dev']);
	grunt.registerTask('build', ['clean:dist','compass:dist','coffee:dist','jade:dist','copy:dist', 'appendBanner']);
	grunt.registerTask('version', 'updateVersion');
};
