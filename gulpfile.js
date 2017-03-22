const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');

const srcDir = './src/',
      distDir = './dist';

gulp.task('build', function () {
    gulp.src([`${srcDir}index.js`])
        .pipe(browserify())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(`${distDir}`))
        .pipe(uglify({
            compress: { drop_console: true }
        }))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(`${distDir}`))
});