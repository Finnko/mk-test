const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const gcmq = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');

let isDev = process.argv.includes('--dev');
let isProd = !isDev;
let isSync = process.argv.includes('--sync');

let config = {
  src: './src/',
  build: './build',
  html: {
    src: '*.html',
    dest: '/'
  },
  img: {
    src: 'img/**/*',
    dest: '/img'
  },
  css: {
    src: 'sass/style.scss',
    watch: 'sass/**/*.scss',
    dest: '/css'
  },
  js: {
    watch: 'js/**/*.js',
    dest: '/js'
  }
};

let webConfig = {
  output: {
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      }
    ]
  },
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'eval-source-map' : 'none'
};

function html() {
  return gulp.src(config.src + config.html.src)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(config.build + config.html.dest))
    .pipe(gulpIf(isSync, browserSync.stream()));
}

function img() {
  return gulp.src(config.src + config.img.src)
    .pipe(gulpIf(isProd, imagemin([
      imagemin.optipng([
        imageminPngquant({
          quality: [0.7, 0.9]
        }),
        imagemin.jpegtran({
          progressive: true
        }),
        imagemin.svgo(),
      ])
    ])))
    .pipe(gulp.dest(config.build + config.img.dest));
}

function css() {
  return gulp.src(config.src + config.css.src)
    .pipe(sass())
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(gcmq())
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
      browsers: ['> 0.3%']
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(gulp.dest(config.build + config.css.dest))
    .pipe(gulpIf(isSync, browserSync.stream()));
}

function scripts() {
  return gulp.src('./src/js/main.js')
    .pipe(webpack(webConfig))
    .pipe(gulp.dest(config.build + config.js.dest))
    .pipe(gulpIf(isSync, browserSync.stream()));
}

function clear() {
  return del(config.build + '/*');
}

function watch() {
  if (isSync) {
    browserSync.init({
      server: {
        baseDir: config.build
      },
      // tunnel: true
    });
  }

  gulp.watch(config.src + config.html.src, html);
  gulp.watch(config.src + config.css.watch, {usePolling: true}, css);
  gulp.watch(config.src + config.js.watch, scripts);
}

let build = gulp.series(clear, gulp.parallel(html, img, css, scripts));

gulp.task('build', build);
gulp.task('watch', gulp.series(build, watch));
