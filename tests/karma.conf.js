/**
 * Created by fabio on 10/09/15.
 */
var rootPath = __dirname + '/';

module.exports = function (config) {
    config.set({
        port: 9876,
        frameworks: ['wiredep', 'jasmine'],
        colors: true,
        logLevel: config.LOG_INFO,
        files: ["../public/app.js",
            "../public/routes.js",
            "../public/components/focus-directive.js",
            "../public/components/util.js",
            "../public/home/home-controller.js",
            "../public/person/create-person-controller.js",
            "../public/person/person-service.js",
            "../public/sortition/sortition-controller.js",
            "../public/sortition/sortition-modal-controller.js",
            "../public/sortition/sortition-service.js",
            "../public/components/confirm-dialog/confirm-dialog.js",
            "./**/*Spec.js"],
        browsers: ['PhantomJS'],
        reporters: ['spec'],
        autoWatch: true,
        singleRun: false,
        wiredep: {
            dependencies: true
        }
    });
};