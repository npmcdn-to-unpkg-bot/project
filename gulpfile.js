var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    changed = require('gulp-changed'),
    uglify = require("gulp-uglify");

// 文件刷新
gulp.task('livereload', function() {
  gulp.src('1*/**/*.html')
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
  gulp.watch(['1*/**','_public/*.css','_public/*.js'], ['livereload']);
});