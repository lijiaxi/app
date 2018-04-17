var gulp = require('gulp')
var rjs = require('requirejs')
const stylus = require('gulp-stylus')
const plumber = require('gulp-plumber')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')
const px2rem = require('postcss-px2rem')
const pug = require('gulp-pug')
const uglify = require('gulp-uglify')
const cssmin = require('gulp-clean-css')
const clean = require('gulp-clean')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const svgmin = require('gulp-svgmin') //压缩svg
const svgSymbols = require('gulp-svg-symbols') //合并svg

const eslint = require('gulp-eslint')
const rsConfig = require('./require.config')

const spritesmith  = require('gulp.spritesmith')


const cssPlugins = [autoprefixer({browsers:['ios >= 7', 'android >= 4.1']})]


const isProduction = process.env.NODE_ENV ? process.env.NODE_ENV == 'production' ? true : false : false
const isPc = process.env.npm_config_pc ? process.env.npm_config_pc : false


gulp.task('postcss', function(){
    // if(!isPc){
    //     cssPlugins.push(px2rem({remUnit: 37.5}))
    // }
    return gulp.src('./www/stylus/*.styl')
        .pipe(plumber())
        .pipe(stylus())
        .pipe(cssmin({keepSpecialComments: '*'}))
        .pipe(postcss(cssPlugins))
        .pipe(gulp.dest('./www/css'))
        .pipe(reload({stream: true}))
})
gulp.task('pug', function(){
    return gulp.src('./www/pug/*.pug')
        .pipe(plumber())
        .pipe(pug({ pretty:true }))
        .pipe(gulp.dest('./www'))
        .pipe(reload({stream: true}))
});
//es6转es5
// gulp.task('es6', function(){
//     return gulp.src('./www/js/app/**/*.js')
//     .pipe(plumber())
//     .pipe(babel({
//         presets: ['es2015']
//     }))
//     .pipe(gulp.dest('./www/js/module'))
//     .pipe(reload({stream: true}))
// })
//监听入口
gulp.task('js', function () {
    return gulp.src(['./www/js/app/**/*.js', '!node_modules/**'])
    .pipe(plumber())
    // .pipe(eslint())
    // .pipe(eslint.format())
    // .pipe(eslint.failAfterError())
    .pipe(reload({stream: true}))
 })
gulp.task('server', ['postcss', 'pug', 'js'], function(){
    browserSync.init({
        server:{
            baseDir: './',
        },
        port: 8080
    })
    gulp.watch('./www/stylus/*.styl', ['postcss']);
    gulp.watch('./www/stylus/commom/*.styl', ['postcss'])
    gulp.watch('./www/pug/*.pug', ['pug'])
    gylp.watch('./www/pug/components/*.pug', 'pug')
    gulp.watch('./www/js/app/**/*.js',['js'])
    gulp.watch('./www/*.html').on('change', reload)
})

//合并svg图标
gulp.task('svg', function(){
    return gulp.src('./wwww/svg/*.svg')
    .pipe(svgmin())
    .pipe(svgSymbols())
    .pipe(gulp.dest('./icon'))
})

//合并精灵图
gulp.task('autoSprite', function () {
  gulp.src('./www/sprite/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    padding: 20 
  }))
  .pipe(gulp.dest('./www/image/'));
});
//打包任务
gulp.task('build', function(cb){
  rjs.optimize({
    appDir: 'www',
    baseUrl: 'js/lib',
    paths: {
      app: '../app',
    },
    dir: 'www-built',
    modules: rsConfig.modules
  }, function(buildResponse){
     console.log('build response', buildResponse);
    cb();
  }, cb);
});

//开发任务
gulp.task('default', ['server'])

