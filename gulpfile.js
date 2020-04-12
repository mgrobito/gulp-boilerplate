const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');


function style() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}

function serve() {
    browserSync.init({
        server: {
            baseDir: './dist',
            index: "/index.html"
        }
    });
    gulp.watch('src/sass/**/*.scss', style);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
    gulp.watch('dist/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.serve = serve;

// for default 
// exports.default = serve