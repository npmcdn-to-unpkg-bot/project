var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    changed = require('gulp-changed'),
    sass = require('gulp-ruby-sass'),
    uglify = require("gulp-uglify"),//JS 压缩
    minifyCss = require("gulp-minify-css"), // css文件压缩
    gutil = require('gulp-util'), //错误日志格式与 gulp 的日志保持一致
    minifyHtml = require("gulp-minify-html"); //html 文件压缩

var num = 'demo';

//sass
gulp.task('sass', function () {
  return sass(num+'/src/index.scss')
    .on('error', sass.logError)
    .pipe(minifyCss())
    .pipe(rename(function (path) {
      path.extname = ".min.css"
    }))
    .pipe(gulp.dest(num+'/src/'));
});
// 文件刷新
gulp.task('livereload', function() {
  gulp.src([num+'/*.html'])
      .pipe(livereload());
});

//图片压缩

gulp.task('imagemin', function(){
    return gulp.src('img/**')
        .pipe(imagemin({
            optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('image/'))
})

gulp.task('imageisux', function() {
    return gulp.src(['img/*'])
               .pipe(imageisux());
});

//JS压缩
gulp.task('minify-js', function () {
    gulp.src(['_public/*.js']) // 要压缩的js文件
    .pipe(uglify())  //使用uglify进行压缩,更多配置请参考：
    .pipe(rename(function (path) {
      path.extname = ".min.js"
    }))
    .pipe(gulp.dest('.')); //压缩后的路径
});
//重命名
gulp.task('rename', function () {
    gulp.src('js/jquery.js')
    .pipe(uglify())  //压缩
    .pipe(rename('jquery.min.js')) //会将jquery.js重命名为jquery.min.js
    .pipe(gulp.dest('js'));

   //  gulp.src("./src/**/hello.txt")
    // .pipe(rename(function (path) {
    //   path.dirname += "/ciao";
    //   path.basename += "-goodbye";
    //   path.extname = ".md"
    // }))
    // .pipe(gulp.dest("./dist")); // ./dist/main/text/ciao/hello-goodbye.md 

    //关于gulp-rename的更多强大的用法请参考https://www.npmjs.com/package/gulp-rename
});

//监听
gulp.task('default', function() {
  livereload.listen(); //要在这里调用listen()方法
  gulp.watch([num+'/**','_public/*.css','_public/*.js'], ['livereload']);
  gulp.watch([num+'/src/index.scss'], ['sass','livereload']);
});

