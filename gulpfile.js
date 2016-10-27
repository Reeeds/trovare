/****************************************************************

	Init Packages

*****************************************************************/


var gulp		     	= require("gulp");

/*----- Utilities ---------------------------------------------*/

var gutil			    = require("gulp-util");
//var plumber			= require('gulp-plumber');
//var notify          = require("gulp-notify");
var runSequence 	= require('run-sequence');

/*----- Sass / CSS --------------------------------------------*/

var sass            = require("gulp-sass");
var mincss          = require("gulp-minify-css");
var autoprefixer    = require('gulp-autoprefixer');
var sourcemaps      = require("gulp-sourcemaps");

/*----- JS ----------------------------------------------------*/

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');



/****************************************************************

	Configs / Paths

*****************************************************************/

// set paths: less,images,scripts


var config = {

  stylesheets: {
    watch: {
      paths: ["./src/assets/scss/**/*.scss"]
    },
    src: {
      paths: ["./src/assets/scss/global.scss"]
    },
    dist: {
      path: "./dist/assets/css/"
    }
  },

  app: {
    watch: {
      paths: ["./src/app/**/*.js", "./src/assets/js/**/*.js"]
    },
    src: {
      files: [
        "./src/assets/js/csv.min.js",
        "./src/app/app.module.js",

        "./src/app/csvjs/csvjs.module.js",
        "./src/app/csvjs/csv.service.js",

        "./src/app/ui/ui.module.js",
        "./src/app/ui/multiselect.directive.js",
        "./src/app/ui/collapsabletext.component.js",

        "./src/app/issuelist/issuelist.module.js",
        "./src/app/issuelist/issuelist.config.js",
        "./src/app/issuelist/multisearch.filter.js",
        "./src/app/issuelist/onreadfile.directive.js",
        "./src/app/issuelist/issuelist.component.js",

        "./src/assets/js/bootstrap-filestyle.min.js",

      ]
    },
    dist: {
      fileName: "app.js",
      path: "./dist/app/"
    }
  },

  templates: {
    watch: {
      paths: ["./src/app/**/*.html"]
    },
    src: {
      paths: ["./src/app/**/*.html"]
    },
    dist: {
      path: "./dist/app/"
    }
  },

  index: {
    watch: {
      paths: ["./src/index.html"]
    },
    src: {
      paths: ["./src/index.html"]
    },
    dist: {
      path: "./dist/"
    }
  }
}


/****************************************************************

	Init Tasks

*****************************************************************/

/*----- Sass / CSS --------------------------------------------*/


// compile & minify scss
gulp.task("compile", function () {
    return gulp
      .src(config.stylesheets.src.paths)
      .pipe(sourcemaps.init())
		  .pipe(sass())
		  .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
      }))
		  .pipe(mincss())
		  .pipe(sourcemaps.write("./"))
		  .pipe(gulp.dest(config.stylesheets.dist.path));
});

gulp.task("copy-templates", function() {
  return gulp
    .src(config.templates.src.paths)
    .pipe(gulp.dest(config.templates.dist.path));
});

gulp.task("copy-index", function() {
  return gulp
    .src(config.index.src.paths)
    .pipe(gulp.dest(config.index.dist.path));
});

gulp.task("app", function() {
  return gulp
    .src(config.app.src.files)
    .pipe(concat(config.app.dist.fileName))
    .pipe(uglify())
    .pipe(gulp.dest(config.app.dist.path))
    .resume();
});


/*----- Watch --------------------------------------------*/

// watch files for changes
gulp.task("watch", function () {
  gulp.watch(config.stylesheets.watch.paths, function() {
    runSequence('compile');
  });

  gulp.watch(config.templates.watch.paths, function() {
    runSequence('copy-templates');
  });

  gulp.watch(config.index.watch.paths, function() {
      runSequence('copy-index');
  });

  gulp.watch(config.app.watch.paths, function() {
    runSequence("app");
  });
});



/****************************************************************

	Start Compiler

*****************************************************************/


// default task
gulp.task("default", function () {
	runSequence(["compile", "copy-templates", "copy-index", "app", "watch"]);
});
