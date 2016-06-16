var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    changed = require('gulp-changed'),
    sass = require('gulp-sass'),
    uglify = require("gulp-uglify"),//JS 压缩
    minifyCss = require("gulp-minify-css"), // css文件压缩
    gutil = require('gulp-util'), //错误日志格式与 gulp 的日志保持一致
    minifyHtml = require("gulp-minify-html"); //html 文件压缩

//sass
gulp.task('sass',function(){
  return gulp.src('1014/src/*.scss')
             .pipe(sass())
             .on('error', function(err) {
                  gutil.log('Less Error!', err.message);
                  this.end();
              })
             .pipe(gulp.dest('1014/src/'));
})
// 文件刷新
gulp.task('livereload', function() {
  gulp.src(['*/*.html','!1001/*.html','!1002/*.html','!1003/*.html','!1004/*.html'
            ,'!1005/*.html','!1006/*.html','!1007/*.html','!1008/*.html','!1009/*.html'
            ,'!1010/*.html','!1011/*.html','!1012/*.html','!1013/*.html','!1tel/*.html','!animated/*.html'
            ,'!canvas/*.html','!default/*.html','!fish/*.html','!map/*.html'
            ,'!tableToExcel/*.html','!1100/*.html','!_public/*.html'])
      .pipe(livereload());
});

gulp.task('livereloadcanvas', function() {
  gulp.src('canvas/*.html')
      .pipe(livereload());
});

gulp.task('livereloaddefault', function() {
  gulp.src('default/**/*.html')
      .pipe(livereload());
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
gulp.task('watch', function() {
  livereload.listen(); //要在这里调用listen()方法
  // gulp.watch(['1*/**','!1*/**/*.min.js','!1*/**/*.min.css','_public/*.css','!_public/*.min.css','_public/*.js','!_public/*.min.js'], ['livereload']);
  // gulp.watch(['1*/**','_public/*.css','_public/*.js'], ['livereload']);
  gulp.watch(['1*/**','_public/*.css','_public/*.js'], ['sass','livereload']);
});

gulp.task('canvas', function() {
  livereload.listen(); //要在这里调用listen()方法
  // gulp.watch(['1*/**','!1*/**/*.min.js','!1*/**/*.min.css','_public/*.css','!_public/*.min.css','_public/*.js','!_public/*.min.js'], ['livereload']);
  gulp.watch(['canvas/**','_public/*.css','_public/*.js'], ['livereloadcanvas']);
});

gulp.task('default', function() {
  livereload.listen(); //要在这里调用listen()方法
  // gulp.watch(['1*/**','!1*/**/*.min.js','!1*/**/*.min.css','_public/*.css','!_public/*.min.css','_public/*.js','!_public/*.min.js'], ['livereload']);
  gulp.watch(['default/**'], ['livereloaddefault']);
});