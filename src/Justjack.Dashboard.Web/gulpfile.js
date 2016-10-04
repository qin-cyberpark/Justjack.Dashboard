/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

"use strict";
var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    less = require("gulp-less"),
    uglify = require("gulp-uglify"),
    cssmin = require("gulp-cssmin"),
    rename = require('gulp-rename'),
    babel = require('gulp-babel');

var lessGroups = [{ src: "./build/less/AdminLTE.less", dest: "./wwwroot/css" },
                  { src: "./build/less/skins/*.less", dest: "./wwwroot/css/skins" },
                  { src: "./build/less/site/*.less", dest: "./wwwroot/css" }, ];

var jsxGroups = [{ src: "./build/jsx/components/*.jsx", dest: "./wwwroot/js/components" },
                { src: "./build/jsx/*.jsx", dest: "./wwwroot/js/" }];

var jsGroups = [{ src: "./wwwroot/js/**/*.js", exclude: "./wwwroot/js/*.min.js", dest: "./wwwroot/js/site.min.js", isBundle: true }];

var cssGroups = [{ src: "./wwwroot/css/skins/*.css", exclude: "./wwwroot/css/skins/*.min.css", dest: "./wwwroot/css/skins/", isBundle: false },
                { src: "./wwwroot/css/*.css", exclude: "./wwwroot/css/*.min.css", dest: "./wwwroot/css/site.min.css", isBundle: true }];

/*clean*/
gulp.task("clean:css", function (cb) {
    rimraf("./wwwroot/css/**/*.css", cb);
});

gulp.task("clean:dist", function (cb) {
    rimraf("./wwwroot/js/**/*.js", cb);
});

gulp.task("clean", ["clean:css", "clean:dist"]);

/*less*/
gulp.task('less', function () {
    for (var i = 0; i < lessGroups.length; i++) {
        var grp = lessGroups[i];
        gulp.src(grp.src)
                .pipe(less())
                .pipe(gulp.dest(grp.dest));
    }
});

/*jsx*/
gulp.task("jsx", function () {
    for (var i = 0; i < jsxGroups.length; i++) {
        var grp = jsxGroups[i];
        gulp.src(grp.src)
                .pipe(babel({
                    plugins: ["transform-react-jsx"],
                    presets: ['es2015']
                }))
                //.pipe(concat(grp.dest))
                .pipe(gulp.dest(grp.dest));
    }
});


///*minify*/
gulp.task("min:js", function () {
    for (var i = 0; i < jsGroups.length; i++) {
        var grp = jsGroups[i];
        var files = gulp.src([grp.src, "!" + grp.exclude]);
        if (grp.isBundle) {
            files = files.pipe(concat(grp.dest));
        } else {
            files = files.pipe(rename({ dirname: grp.dest, suffix: '.min' }));
        }

        //files.pipe(uglify())
        files.pipe(gulp.dest("."));
    }
});


gulp.task("min:css", function () {
    for (var i = 0; i < cssGroups.length; i++) {
        var grp = cssGroups[i];
        var files = gulp.src([grp.src, "!" + grp.exclude]);
        if (grp.isBundle) {
            files = files.pipe(concat(grp.dest));
        } else {
            files = files.pipe(rename({ dirname: grp.dest, suffix: '.min' }));
        }

        files.pipe(cssmin())
        .pipe(gulp.dest("."));
    }
});