module.exports = function(grunt) {
    'use strict';
    
    // Load grunt plugins 'just-in-time'
    require('jit-grunt')(grunt);
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            css: "assets/css",
            js: "assets/js",
            scss: "assets/scss"
        },
        watch: {
            options: {
                spawn: false // Makes watch run A LOT faster, and also lets you pass variables to the grunt tasks being called
            },
            js: {
                files: ['<%= dirs.js %>/src/*.js'],
                tasks: ['concat:js','uglify']
            },
            scss: {
                files: [
                    '<%= dirs.scss %>/*.scss'
                ],
                tasks: ['compass','concat:css']
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: '<%= dirs.scss %>',
                    cssDir: '<%= dirs.css %>/src',
                    environment: 'production',
                    raw: 'preferred_syntax = :scss\n', // Use `raw` since it's not directly available
                    outputStyle: 'compressed'
                }
            }
        },
        concat: {
            css: {
                options: {
                    separator: ''
                },
                src: ['<%= dirs.css %>/src/*.css'],
                dest: '<%= dirs.css %>/dist/amarkal-settings.min.css'
            },
            js: {
                options: {
                    banner: '(function($,global){',
                    footer: '})(jQuery, window);',
                    separator: "\n"
                },
                src: [
                    '<%= dirs.js %>/src/core.js',
                    '<%= dirs.js %>/src/notifier.js',
                    '<%= dirs.js %>/src/search.js',
                    '<%= dirs.js %>/src/sections.js',
                    '<%= dirs.js %>/src/header.js',
                    '<%= dirs.js %>/src/button.js',
                    '<%= dirs.js %>/src/form-controls.js',
                    '<%= dirs.js %>/src/functions.js'
                ],
                dest: '<%= dirs.js %>/dist/amarkal-settings.min.js'
            }
        },
        uglify: {
            main: {
                options: {
                    banner: ''
                },
                files: {
                    '<%= dirs.js %>/dist/amarkal-settings.min.js': ['<%= dirs.js %>/dist/amarkal-settings.min.js']
                }
            }
        }
    });
};