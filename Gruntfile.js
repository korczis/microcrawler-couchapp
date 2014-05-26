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
                        '_attachments/script/app/app.js'
                    ],
                    dest: '_attachments/assets/app.js'
                },

                vendor: {
                    src: [
                        '_attachments/script/jquery/jquery.js',
                        '_attachments/script/handlebars/handlebars.js',
                        '_attachments/script/ember/ember.js',
                        '_attachments/script/ember-data/ember-data.js'
                    ],
                    dest: '_attachments/assets/vendor.js'
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
            'concat',
            'emberTemplates'
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