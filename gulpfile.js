/**
 * Created by Biswa on 9/21/2016.
 */
var gulp= require('gulp'),mon=require('gulp-nodemon');

gulp.task('default',function () {
    mon({
        script:'app.js',ext:'js'
    }).on('restart',function () {
        console.log("retarting");
    })
});
