module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-html');  // does not work for me
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default',['uglify','htmlmin','cssmin','uncss','jshint']);
  grunt.initConfig({
    pkg : require('./package.json'),
    concat : {
      dist : {
	src: '*.js',
	dest: 'build/script.js'
      }
    },
    htmllint: {
      all: ["wuerfel.html" ],
      reporter : 'checkstyle'
    },
    htmlhint: {
      html: {
	options: {
	  'tagname-lowercase' : true,
	  'attr-lowercase' : true,
	  'attr-value-double-quotes' : true,
	  'attr-value-not-empty' : true,
	  'attr-no-duplication' : true,
	  'doctype-first' : true,
	  'tag-pair' : true,
	  'spec-char-escape' : true,
	  'id-unique' : true,
	  'src-not-empty' : true,
	  'title-require' : true,
	  'head-script-disabled' : true,
	  'alt-require' : true,
	  'doctype-html5' : true,
	  'id-class-value' : true,
	  'style-disabled' : true,
	  'inline-style-disabled' : true,
	  'space-tab-mixed-disabled' : true,
	  'id-class-ad-disabled' : true,
	  'href-abs-or-rel' : true,
	  'attr-unsafe-chars' : true,
	},
	src : ["wuerfel.html" ]
      },
    },
    uglify : {
      dist : {
	options : {
	  banner    : '// <%=grunt.template.today("dd.mm.yyyy") %> by <%= pkg.author %>\n',
	  sourceMap : true
	},
	src  : '<%= concat.dist.dest %>',
	dest : 'build/script.js'
      }
    },
    htmlmin: {                                     // Task
      dist: {                                      // Target
	options: {                                 // Target options
	  removeComments: true,
	  collapseWhitespace: true
	},
	files: {                                   // Dictionary of files
	  'build/dice.html': 'dice.html',          // 'destination': 'source'
	}
      }
    },
    cssmin: {
      dist: {
	files: [{
	  expand: true,
	  src: ['*.css' ],
	  dest: 'build',
	}]
      }
    },
    uncss:{
      dist: {
	files: {
	  'build/style.css' : [ 'dice.html','verdoppler.html','wuerfel.html' ]
	}
      }
    },
    jshint:{
      dist: {
	files: {
	  'build/backgammon_machine.js' : 'backgammon_machine.js'
	},
	options : {
	  reporter : require('jshint-stylish'),
	  unused : true
	}
      }
    },
    watch: {
      options: {
	dateFormat: function(time) {
	  grunt.log.writeln('The watch finished in ' + time + 'ms at ' + (new Date()).toString());
	  grunt.log.writeln('Waiting for more changes...');
	},
      },
      scripts: {
	files: '*.js',
	tasks: 'jshint',
      },
      stylesheets : {
	files: 'style.css',
	tasks: 'uncss',
      }
    }
  });
};
