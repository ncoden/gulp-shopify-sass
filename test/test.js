var assert = require('stream-assert');
var should = require('should');
var File = require('vinyl');
var gulp = require('gulp');
var gulpShopifySass = require('../index');
var test = require('./test-stream');

describe('gulp-shopify-sass', function () {
  describe('in buffer mode', function () {

    it('skip files doesn\'t exist', function (done) {
      test('@import "foo.scss";')
        .pipe(gulpShopifySass())
        .pipe(assert.length(1))
        .pipe(assert.first(function(f){f.contents.toString().should.equal('@import "foo.scss";')}))
        .pipe(assert.end(done));
    });

    it('work on single sass file', function (done) {
      test('.class-name{}')
        .pipe(gulpShopifySass())
        .pipe(assert.length(1))
        .pipe(assert.first(function(f){f.contents.toString().should.equal('.class-name{}')}))
        .pipe(assert.end(done));
    });

    // it('replace import on single file', function (done) {
    //   test('@import "file1.scss";', '.class-name{}')
    //     .pipe(gulpShopifySass())
    //     .pipe(assert.length(2))
    //     .pipe(assert.first(function(f){f.contents.toString().should.equal('.class-name{}')}))
    //     .pipe(assert.end(done));
    // });

    // it('replace import recursively', function (done) {
    //   test('@import "file1.scss";', '@import "file2.scss";', '.class-name{}')
    //     .pipe(gulpShopifySass())
    //     .pipe(assert.length(3))
    //     .pipe(assert.first(function(f){f.contents.toString().should.equal('.class-name{}')}))
    //     .pipe(assert.end(done));
    // });

    it('replace import', function (done) {
      gulp.src('./test/fixtures/b.scss')
        .pipe(gulpShopifySass())
        .pipe(assert.length(1))
        .pipe(assert.first(function(f){f.contents.toString().should.equal('.class-name {}')}))
        .pipe(assert.end(done));
    });

    it('replace import recursively', function (done) {
      gulp.src('./test/fixtures/c.scss')
       .pipe(gulpShopifySass())
       .pipe(assert.length(1))
       .pipe(assert.first(function(f){f.contents.toString().should.equal('.class-name {}')}))
       .pipe(assert.end(done));
    });

    it('replace multiple import', function (done) {
      gulp.src('./test/fixtures/d.scss')
        .pipe(gulpShopifySass())
        .pipe(assert.length(1))
        .pipe(assert.first(function(f){f.contents.toString().should.equal('.class-name {}\n.class-name {}')}))
        .pipe(assert.end(done));
    });

    it('replace multiple types of import', function (done) {
      gulp.src('./test/fixtures/e.scss')
        .pipe(gulpShopifySass())
        .pipe(assert.length(1))
        .pipe(assert.first(function(f){f.contents.toString().should.equal('.class-name {}\n.class-name {}\n.class-name {}\n.class-name {}')}))
        .pipe(assert.end(done));
    });

    it('replace import .scss.liquid', function (done) {
      gulp.src('./test/fixtures/f.scss')
        .pipe(gulpShopifySass())
        .pipe(assert.length(1))
        .pipe(assert.first(function(f){f.contents.toString().should.equal('.dash {}\n.dash {}\n.dash {}\n.dash {}')}))
        .pipe(assert.end(done));
    });

    it('do not import .scss.liquid if .scss exist', function (done) {
      gulp.src('./test/fixtures/g.scss')
        .pipe(gulpShopifySass())
        .pipe(assert.length(1))
        .pipe(assert.first(function(f){f.contents.toString().should.equal('.class-name {}\n.class-name {}')}))
        .pipe(assert.end(done));
    });
  });

});
