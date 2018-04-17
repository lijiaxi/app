//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        vue: 'https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.min',
        lodash: 'https://cdn.bootcss.com/lodash.js/4.17.5/lodash.min'
    }
});
