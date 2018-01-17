var gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify     = require('gulp-uglify'),
    gulpIf     = require('gulp-if'),
    imagemin   = require('gulp-imagemin'),
    cache      = require('gulp-cache'),
    del        = require('del'),
    useref     = require('gulp-useref'),
    cssnano    = require('gulp-cssnano'),
    fs         = require('fs'),
    browserSync= require('browser-sync').create();
    modRewrite = require('connect-modrewrite');

const targetPath = 'public/assets/',
      sourcePath = 'resources/assets/',
      vendorPath = 'node_modules/';

gulp.task('sass', () => {
    return gulp.src(sourcePath + 'sass/*.scss')
        .pipe(sourcemaps.init())
            .pipe(sass({ includePaths: [vendorPath] })
                  .on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(targetPath + 'css'))
        .pipe(gulp.dest(sourcePath + 'css'))
        .pipe(browserSync.reload({
          stream: true
        }));
});

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch(sourcePath + 'sass/**/*.scss', ['sass']);
  gulp.watch('resources/**/*.html', browserSync.reload);
  gulp.watch('resources/app/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'resources',
      middleware: [
          modRewrite([
              '^[^\\.]*$ /index.html [L]'
          ])
      ]
    },
  })
});

gulp.task('images', function(){
  return gulp.src(sourcePath + 'images/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest(targetPath + 'images'));
});

gulp.task('useref', function(){
  return gulp.src('resources/**/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    // .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('public'))
});

gulp.task('fonts', function() {
  return gulp.src(sourcePath + 'fonts/**/*')
  .pipe(gulp.dest(targetPath + 'fonts'))
});

gulp.task('clean', function() {
  if (fs.existsSync('public')) {
    return del.sync('public');
  } else {
    console.log('Nothing to clean');
  }
});

gulp.task('extras', function () {
    return gulp.src('resources/.htaccess')
               .pipe(gulp.dest('public/'));
});

gulp.task('build', [`clean`, `sass`, `useref`, `images`, `fonts`, `extras`], function (){
  console.log('Building files');
});
