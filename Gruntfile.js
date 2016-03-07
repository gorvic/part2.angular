'use strict';

module.exports = function (grunt) {

    //load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Project settings
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };
    var serveStatic = require('serve-static');

    //grunt.log.write(appConfig.app);

    grunt.initConfig({

        connect: {
            options: {
                port: 8080,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect().use(
                                '/app/styles',
                                connect.static('./app/styles')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            }
        },

        watch: {
            scripts: {
                options: { // Live reload is now specific to this task
                    livereload: true
                },
                files: [   // Files to livereload on
                    "app/**/*.js",
                    "app/**/*.html"
                ]
            }
        },
        wiredep: {
            app: {
                src: [
                    'app/index.html'
                ],
                ignorePath: /\.\.\//,
                devDependencies: true
            },
            test: {
                src: [
                    'karma.conf.js'
                ],
                ignorePath:  /\.\.\//,
                devDependencies: true,
                cwd: './' // ! иначе не видит файлы в корне директории проекта
                //fileTypes: {
                //    js: {
                //        block: /(([ \t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                //        detect: {
                //            js: /'(.*\.js)'/gi
                //        },
                //        replace: {
                //            js: '\'{{filePath}}\','
                //        }
                //        replace: {
                //            js: function (filePath) {
                //                grunt.log.writeln(filePath);
                //                return filePath;
                //            }
                //        }
                //    }
                //}
            }
        },

        //цель - чтобы в karma  загружались все bower dependencies, including dev
        //т.к. wiredep:test работает с karma.conf.js только если она не в корне
        //(любые пути - ./, /, '' не срабатывают.Оказалось, что karma.conf.js находится, т.к.
        //убирает пустые строки между маркерами (bower.js & endbower), но не вставляет пути
        //bower_components.  Пусть заполняется в папке test,
        //потом через grunt-text-replace заменим  ../bower_  на /bower
        //а потом копируется в корень через grunt-contrib-copy
        //Решение см. ниже
        copy: {
            karma: {
                src: 'test/karma.conf.js',
                dest: './karma.conf.js'
            }
        },

        replace: {
            karma: {
                src: ['test/karma.conf.js'],
                overwrite: true,                 // overwrite matched source files
                replacements: [{
                    from: '../bower_',
                    to: 'bower_'
                }]
            }
        }

    });

    // These plugins provide necessary tasks.
    //grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-contrib-connect');
    // grunt.loadNpmTasks('grunt-wiredep');

    // Default task.
    grunt.registerTask('default', ['wiredep:app', 'connect:livereload', 'watch']);

    //РЕШЕНИЕ:  использовать option
    // cwd: './'. Также важно, что fileTypes: block, detect, replace работают через override
    //если не указывать - используются настройки по умолчанию
    grunt.registerTask('karma', ['wiredep:test', 'replace:karma', 'copy:karma']);

};
