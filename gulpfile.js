const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();

const baseDir = './';
const distDir = 'dist';
const srcSass = 'src/sass';
const srcJs = 'src/sass';
const distSass = 'dist/css';
const distJs = 'dist/js';


// Clean All the 'dist' Directory
gulp.task('clean', function(){
    return gulp.src(distDir, {read: false, allowEmpty: true})
        .pipe(clean({force: true}));
});

//outputStyle in gulp-sass has four options: nested, expanded, compact, compressed
gulp.task('style', function(){
    return gulp.src(srcSass+'/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({outputStyle: 'nested'}))
        .pipe(gulp.dest(distSass))
        .pipe(browserSync.stream());
});


gulp.task('serve', function(){
	browserSync.init({
		server:{
			baseDir:baseDir,
			index: "/pages/index.html"
		}
	});
	gulp.watch('src/sass/**/*.scss',gulp.series('style'));
	gulp.watch('pages/*.html').on('change', browserSync.reload);
	gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
});


gulp.task('reset', gulp.series('clean','style'));
gulp.task('watch', gulp.parallel('serve'));

gulp.task('default', gulp.parallel('style'));