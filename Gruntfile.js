// Copyright, 2013-2014, by Tomas Korcak. <korczis@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

(function (globals) {
    'use strict';

    module.exports = function (grunt) {
        var path = require('path');

        var templatesDir = "./_attachments/templates/";

        grunt.loadNpmTasks('grunt-bower-task');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-ember-templates');

        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            meta: {
                banner: '/*! <%=pkg.name%> - v<%=pkg.version%> (build <%=pkg.build%>) - ' +
                    '<%=grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT")%> */'
            },

            bower: {
                install: {
                    //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
                }
            },

            concat: {
                options: {
                    separator: ';'
                },

                app: {
                    src: [
                        // Core app
                        '_attachments/script/app/app.js',

                        // Core scripts
                        '_attachments/script/app/logger.js',
                        '_attachments/script/app/router.js',
                        '_attachments/script/app/xhr.js',

                        // Views
                        '_attachments/script/app/appView.js'
                    ],
                    dest: '_attachments/assets/app.js'
                },

                vendor: {
                    src: [
                        '_attachments/script/jquery/jquery.js',
                        '_attachments/script/handlebars/handlebars.js',
                        '_attachments/script/ember/ember.js',
                        '_attachments/script/ember-data/ember-data.js',
                        '_attachments/script/jquery.couch/jquery.couch.js',
                        '_attachments/script/ember-couchdb-kit/ember-couchdb-kit.js',
                        '_attachments/script/moment/moment.js'
                    ],
                    dest: '_attachments/assets/vendor.js'
                },

                bundle: {
                    src: [
                        '_attachments/assets/vendor.js',
                        '_attachments/assets/app.js',
                        '_attachments/assets/templates.js'
                    ],
                    dest: '_attachments/assets/bundle.js'
                }
            },

            cssmin: {
                combine: {
                    keepSpecialComments: true,
                    files: {
                        '_attachments/assets/bundle.css': [
                            '_attachments/style/bootstrap.css',
                            '_attachments/style/app.css'
                        ]
                    }
                }
            },

            emberTemplates: {
                compile: {
                    options: {
                        templateName: function (filename) {
                            var res = filename;

                            res = res.replace(templatesDir, '');
                            res = res.replace(/^routes\//, "");

                            return res;
                        }
                    },

                    files: {
                        "./_attachments/assets/templates.js": [
                                templatesDir + "**/*.hbs"
                        ]
                    }
                }
            }
        });

        // Build all assets required for running the app
        grunt.registerTask('build', [
            'emberTemplates',
            'concat',
            'cssmin'
        ]);

        // Clean all assets created during build
        grunt.registerTask('clean', []);

        // Default tasks.
        grunt.registerTask('default', [
            'clean',
            'build'
        ]);
    };

}(this));