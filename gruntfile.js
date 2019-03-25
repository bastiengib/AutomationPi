// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {
    // CONFIGURE GRUNT
    grunt.initConfig({
       // get the configuration info from package.json file
       // this way we can use things like name and version (pkg.name)
       pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: 'build/',
            dist: 'dist/'
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['index.js', 'plugins/*/*.js'],
                dest: 'build/<%= pkg.name %>.js'
            },
            vendors: {
                src: [
                    'node_modules/hapi/lib/*.js', // hapi
                    'node_modules/node_wol/index.js', // node_wol
                    'node_modules/{lib/{internal/}}/*.js' //pushbullet
                ],
                dest: 'build/<%= pkg.name %>.vendors.js'
            }
        },

       // all of our configuration goes here
       uglify: {
            dist: {
                src: ['<%= concat.dist.dest.scripts.js %>'],
                dest: 'dist/<%= pkg.name %>.min.js'
            },
            clean: {
                build: 'build/',
            }
        }
    });
 
    // log something
    grunt.log.write('Hello world! Welcome to Tutorialspoint!!\n');
 
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Load the plugin that provides the "concat" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
 
    // Build task(s).
    grunt.registerTask('build', ['clean', 'concat','uglify']);
    
 };