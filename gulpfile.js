'use strict';

const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const eslint = require('gulp-eslint');
const noGitIgnore = require('gulp-exclude-gitignore');
const mocha = require('gulp-mocha');

const dirs = {
  js: path.resolve(`${__dirname}/**/*.js`),
  tests: path.resolve(`${__dirname}/test/**/*.js`)
}

gulp.task('lint', () => {
  return gulp.src(dirs.js)
  .pipe(noGitIgnore())
    .pipe(eslint())
    .pipe(eslint.format('node_modules/eslint-codeframe-formatter'))
    .pipe(eslint.failAfterError());
});

gulp.task('mocha', () => {
  return gulp.src(dirs.tests, { read: false })
    .pipe(mocha({ reporter: 'spec' }))
    .on('error', gutil.log);
});

gulp.task('watch', () => {
  gulp.watch(dirs.js, ['lint', 'mocha']);
});

gulp.task('default', ['lint', 'mocha', 'watch']);
