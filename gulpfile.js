var gulp = require('gulp');
var karma = require('karma').server;
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var browserify = require('gulp-browserify');
var run = require('gulp-run');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var image = require('gulp-image');


var path = {
  sources: {
    ENTRY_POINT: __dirname + '/client/src/main.jsx',
    HTML: [__dirname + '/client/index.html', __dirname + '/client/login.html'],
    CSS: __dirname + '/client/css/*.css',
    JS: [__dirname + '/client/src/**/*.js'],
    ALL: [__dirname + '/client/src/*.js', __dirname + '/client/src/**/*.js', __dirname + '/client/css/*.css', __dirname + '/client/index.html', __dirname + '/client/login.html'],
    ASSETS: [__dirname + '/client/assets']
  },
  dest: {
    OUT: 'lenderbee.js',
    MINIFIED_OUT: 'lenderbee.min.js',
    DEST_SRC: 'client/dist',
    DEST_BUILD: 'client/dist/build',
    DEST: 'client/dist',
    DEST_ASSETS: 'client/dist/assets',
    JS: 'client/dist/js'
  },
  karmaConf: __dirname + '/karma.conf.js'
};

// files to concat into final build
// TODO: Needs to be updated with correct paths
var filesToUglify = [
  paths.src.bower + '/',
  paths.src.bower + '/',
  paths.src.bower + '/',
  paths.dist.public + '/'
];


var handleError = function(err) {
  console.log(err.toString());
  this.emit('end');
};

// TODO: file paths needs to be updated
gulp.task('uglify', function() {
  return gulp.src(filesToUglify)
    .pipe(concat('lenderbee.js'))
    .pipe(gulp.dest(paths.dist.js));
});

// Cleans client/dist folder
// TODO: confirm this is working...
gulp.task('clean', function() {
  return gulp.src(paths.dest.DEST)
    .pipe(clean({
      force: true
    }))
    .on('error', handleError);   
});

gulp.task('javascript', function(callback) {
  runSequence('browserify', 'uglify', callback);
});

// optimizes images
gulp.task('image', function() {
  return gulp.src(paths.sources.ASSETS + '/**/*')
    .pipe(image())
    .pipe(gulp.dest(paths.dest.DEST_ASSETS));
});

// compiles jsx --> js
gulp.task('browserify', function() {
  return gulp.src(path.sources.JS)
    .pipe(browserify({
      debug: false,
      transform: ['reactify'],
    }))
    .on('error', handleError)
    .pipe(rename('lenderbee.bundled.js'))
    .pipe(gulp.dest(paths.dest.JS))
});

// paths to watch
gulp.task('watch', function() {
  gulp.watch(paths.sources.JS, ['javascript']);
  gulp.watch(path.sources.ASSETS + '/**/*', ['image']);
});

// Makes sure nodemon is run after build
gulp.task('server', function() {
  gulp.start('nodemon');
});

// deployment build
gulp.task('build', function() {
  runSequence('clean', 'javascript', 'image');
});

// Default Task
gulp.task('default', ['image', 'javascript', 'watch', 'server']);

