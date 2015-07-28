var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var wrap = require('gulp-wrap');
var mocha = require('gulp-mocha');
var child = require('child_process');
var notifierReporter = require('mocha-notifier-reporter');

var paths = {
  server: 'src/app.coffee',
  scripts: ['src/client/**/*.module.coffee', 'src/client/**/*.coffee']
};

function handleError(err) {
  gutil.log(err.toString());
  this.emit('end');
}

var server;
function spawnServer() {
  if(server) {
    gutil.log(gutil.colors.yellow('Restarting server'));
    server.kill();
  }
  server = child.spawn('coffee', ['./src/app.coffee'], {stdio: 'inherit'});
}

gulp.task('serve', function () {
  spawnServer();
});

gulp.task('compile:js', function() {
  gulp.src(paths.scripts)
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(concat('app.min.js'))
    .pipe(uglify({
      mangle: false,
      compress:{
        sequences:false
      }
    }))
    .pipe(wrap('(function(){"use strict";<%= contents %>})();'))
    .pipe(gulp.dest('./public/js'))
});

gulp.task('test', function() {
  require('coffee-script/register');

  return gulp.src('test/**/*.coffee', {
    read: false
  }).pipe(mocha({
    reporter: notifierReporter.decorate('spec'),
    globals: {
      should: require('should')
    }
  })).on("error", handleError);
});

gulp.task('default', ['compile:js', 'test', 'serve'], function() {
  gulp.watch(['src/client/**/*.coffee'], ['compile:js']);
  gulp.watch(['src/**/*.coffee', 'test/**/*.coffee'], ['test']);
  gulp.watch(['src/**/*.coffee'], spawnServer);
});
