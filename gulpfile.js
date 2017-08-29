'use strict';

var path = require('path');
var pathConnect = "./build/webRoot";

//编译路径
var baseConfig = {
	service: {
		bathPath: "/",
		pagePath: "/",
		version: "3.51",
		appVersion: "1.5.0"
	},
	htmlPath: ["./src/html/**/*.html"],
	htmlDest: pathConnect,
	jsPath: ["./src/static/package/**/*.js"],
	jsDest: pathConnect+"/static/js",
	cssPath: ["./src/static/sass/**/*.*"],
	cssDest: pathConnect + "/static/css",
	pluginPath: ['./src/static/plugins/**/*'],
	imgPath: ['./src/static/img/**/*'],
	pluginPathDest: pathConnect + '/static/plugins',
	imgPathDest: pathConnect+"/static/img",
	testAppid: "wxc6f7d5af37032740",
	uatAppid: "wxaeb6bd2043895703",
	appid: "wx9447a1df5eebfffb",
	dest: pathConnect, //目标路径
	version: "2.0.2" //版本号
};
baseConfig.myAppid = baseConfig.appid;

var gulp = require('gulp');


/*
 * 安装 gulp-imports npm install gulp-imports --save-dev
 * 书写格式 : //import("subdir1a/file3.js");
 * 压缩js
 */
var gulpImports = require('gulp-imports');
var uglify = require('gulp-uglify');
gulp.task('imports', function() {
    gulp.src(baseConfig.jsPath)
        .pipe(gulpImports())
		.pipe(replace("{bathPath}", baseConfig.service.bathPath)) //static bathPath
		.pipe(replace("{pagePath}", baseConfig.service.pagePath)) //{pagePath}page pagePath
		.pipe(replace("{version}", baseConfig.service.version)) //version
		.pipe(replace("{appVersion}", baseConfig.service.appVersion)) //version
		.pipe(replace("{appid}", baseConfig.myAppid)) //version
		.pipe(uglify())
        .pipe(gulp.dest(baseConfig.jsDest));
});

/*
 * 安装 gulp-css-imports npm install gulp-cssimports --save-dev
 * @import "a.css";
 
var cssimport = require("gulp-cssimport");
var options = {};
	gulp.task("import", function() {
    gulp.src("src/style.css")
        .pipe(cssimport(options))
        .pipe(gulp.dest("dist/"));
}); */

/**
 * html include
 * 引入其他页面
 */
var htmlInclude = require("gulp-html-tag-include");
var replace = require("gulp-replace");
gulp.task('html', function() {
    return gulp.src(baseConfig.htmlPath)
        .pipe(htmlInclude())
		.pipe(replace("{bathPath}", "/")) //static bathPath
		.pipe(replace("{pagePath}", baseConfig.service.pagePath)) //{pagePath}page pagePath
		.pipe(replace("{version}", baseConfig.service.version)) //version
		.pipe(replace("{appid}", baseConfig.myAppid)) //version
        .pipe(gulp.dest(baseConfig.dest));
});

/*
 * sass
 * minifycss 压缩css
 */
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
gulp.task('sass', function () {
return gulp.src(baseConfig.cssPath)
    .pipe(sass().on('error', sass.logError))
	.pipe(minifycss())
	.pipe(gulp.dest(baseConfig.cssDest));
});

//移动文件
gulp.task('copyPlugin',  function() {
  return gulp.src(baseConfig.pluginPath)
    .pipe(gulp.dest(baseConfig.pluginPathDest))
});

//移动文件
gulp.task('copyImg',  function() {
	return gulp.src(baseConfig.imgPath)
		.pipe(gulp.dest(baseConfig.imgPathDest))
});

gulp.task('watch', function(){
	gulp.watch('src/**/*', ["copyPlugin", "copyImg", "miniFont", 'sass', 'html', "imports"]);
});

/*
 * 压缩plugin中的css
 */
gulp.task("miniFont", function () {
	return gulp.src("./src/static/plugins/yaok-font/*.css")
		.pipe(minifycss())
		.pipe(gulp.dest(pathConnect + "/static/plugins/yaok-font"));
});

gulp.task('default', function() {
	gulp.run("copyPlugin");
	gulp.run("copyImg");
    gulp.run('imports');
    gulp.run("html");
    gulp.run("sass");
    gulp.run("miniFont");
	gulp.run("watch");
});

