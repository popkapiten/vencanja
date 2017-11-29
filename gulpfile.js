var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var include = require('gulp-include');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');

// live reload
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
        port: 5555
    })
});


// compile sass and add autoprefixer
gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['> 0.005%'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('scripts', function () {
    gulp.src("app/js/app.js")
        .pipe(include())
        .pipe(gulp.dest("app/js/dist"));
})

// concat css, uglify js and add sourcemaps
gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulpIf('*.js', include()))
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('dist'))
});

// image optimization
gulp.task('images', function () {
    return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});

// copying fonts to build folder
gulp.task('fonts', function () {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

// copying fonts to build folder
gulp.task('configurator', function () {
    return gulp.src('app/configurator/**/*')
        .pipe(gulp.dest('dist/configurator'))
});

gulp.task('htaccess', function () {
   return gulp.src('app/.htaccess')
       .pipe(gulp.dest('dist'))
});

// delete all files in dist folder
gulp.task('clean:dist', function () {
    return del.sync('dist');
});

// clear cache
gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback)
});

// watch changes and reload browser
gulp.task('watch', ['browserSync', 'sass' ], function () {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', ['scripts'], browserSync.reload);
});

// BUILD FOR DEPLOYMENT TASK
gulp.task('build', function (callback) {
    runSequence('clean:dist', 'sass', [ 'images', 'fonts', 'configurator', 'htaccess' ,'useref'],
        callback
    )
});

// TASK FOR DEVELOPMENT
gulp.task('default', function (callback) {
    runSequence(['sass', 'scripts', 'browserSync', 'watch'],
        callback
    )
});

