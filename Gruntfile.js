module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: {
            dev: {
                src: ['public/dev']
            },
            dist: {
                src: ['public/dist']
            }
        },
        concat: {
            js: {
                src: ['public/javascripts/vendor/*.js', 'public/javascripts/*.js'],
                dest: 'public/dev/rss-app.js',
                separator: ";"
            },

            css: {
                src: ['public/stylesheets/vendor/*.css', 'public/stylesheets/*.css'],
                dest: 'public/dev/rss-app.css'
            }
        },
        cssmin: {
            compress: {
                files: {
                    "public/dist/rss-app.min.css" : "<%= concat.css.dest %>"
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            js: {
                src: '<%= concat.js.dest %>',
                dest: 'public/dist/rss-app.min.js'
            }
        },
        watch: {
            js: {
                files: ["<%= concat.js.src %>"],
                tasks: ["concat:js"]
            },
            css: {
                files: ["<%= concat.css.src %>"],
                tasks: ["concat:css"]
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('dev', ['clean', 'concat', 'watch']);
    grunt.registerTask('dist', ['clean', 'concat', 'uglify', 'cssmin']);
    grunt.registerTask('default', 'dev');

};