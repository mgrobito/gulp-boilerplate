const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean');

const baseDir = 'dist';
const srcSass = 'src/sass';
const distSass = 'dist/css';


gulp.task('clean', function(){
    return gulp.src(baseDir, {read: false})
        .pipe(clean({force: true}));
});

//outputStyle in gulp-sass has four options: nested, expanded, compact, compressed
gulp.task('style', function(){
    return gulp.src(srcSass+'/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({outputStyle: 'nested'}))
        .pipe(gulp.dest(distSass))
});



gulp.task('default', gulp.parallel('style'));