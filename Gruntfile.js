/* jshint node:true */

"use strict";

module.exports = function (grunt) {
    // Show elapsed time at the end
    require("time-grunt")(grunt);
    // Load all grunt tasks
    require("load-grunt-tasks")(grunt);

    // Project configuration.
    grunt.initConfig({
        config: {
            main: "object-event",
            global: "objectEvent"
        },
        nodeunit: {
            files: ["test/bootstrap.js"]
        },
        jshint: {
            options: {
                jshintrc: ".jshintrc",
                reporter: require("jshint-stylish")
            },
            gruntfile: {
                src: "Gruntfile.js"
            },
            lib: {
                src: ["<%= config.main %>.js", "lib/*.js"]
            },
            test: {
                src: ["test/**/*.js"]
            }
        },
        watch: {
            gruntfile: {
                files: "<%= jshint.gruntfile.src %>",
                tasks: ["jshint:gruntfile"]
            },
            lib: {
                files: "<%= jshint.lib.src %>",
                tasks: ["jshint:lib", "nodeunit"]
            },
            test: {
                files: "<%= jshint.test.src %>",
                tasks: ["jshint:test", "nodeunit"]
            }
        }
    });

    // Default task.
    grunt.registerTask("test", ["jshint", "nodeunit"]);
};
