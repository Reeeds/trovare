/****************************************************************

	Init Packages

*****************************************************************/


var gulp		     	= require("gulp");

/*----- Utilities ---------------------------------------------*/

var gutil			    = require("gulp-util");
var plumber			= require('gulp-plumber');
var notify          = require("gulp-notify");
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

  js: {
    watch: {
      paths: [".src/assets/js/*.js"]
    },
    src: {
      paths: ["./src/assets/js/*.js"]
    },
    dist: {
      path: "./dist/assets/js"
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
        "./src/app/ui/autoloader.directive.js",
        "./src/app/ui/linebreak.filter.js",
        "./src/app/ui/scrolltop.directive.js",
        "./src/app/ui/scrolltopbutton.component.js",

        "./src/app/issuelist/issuelist.module.js",
        "./src/app/issuelist/issuelist.config.js",
        "./src/app/issuelist/multisearch.filter.js",
        "./src/app/issuelist/onreadfile.directive.js",
        "./src/app/issuelist/issuelist.component.js",
        "./src/app/issuelist/parser.service.js",
        "./src/app/issuelist/highlighter.filter.js",
        "./src/app/issuelist/tablefield.component.js",

        "./src/assets/js/bootstrap-filestyle.min.js"

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

var onError = function(err) {
	notify.onError({
		//User error, not err. notify will pass the error object as error variable
		title: "Gulp: Error for <%= error.plugin %>",
		subtitle: "<%= error.fileName %> did not compile!",
		message:  "<%= error.message %>",
		emitError: true
    })(err);

	this.emit('end');
};

/*----- Sass / CSS --------------------------------------------*/


// compile & minify scss
gulp.task("compile", function () {
    return gulp
      .src(config.stylesheets.src.paths)
      .pipe(plumber({ errorHandler: onError }))
      .pipe(sourcemaps.init())
		  .pipe(sass())
		  .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
      }))
		  .pipe(mincss())
		  .pipe(sourcemaps.write("./"))
		  .pipe(gulp.dest(config.stylesheets.dist.path))
		  .pipe(notify({ message: "Successfully compiled."
		               , onLast: true
		                , title: "Trovare Notification"}));
});

gulp.task("copy-js", function() {
  return gulp
    .src(config.js.src.paths)
    .pipe(gulp.dest(config.js.dist.path));
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
    //.pipe(uglify())
    .pipe(gulp.dest(config.app.dist.path))
    .resume();
});


/*----- Watch --------------------------------------------*/

// watch files for changes
gulp.task("watch", function () {
  gulp.watch(config.stylesheets.watch.paths, function() {
    runSequence('compile');
  });

  gulp.watch(config.js.watch.paths, function() {
    runSequence('copy-js');
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
	runSequence(["compile", "copy-js", "copy-templates", "copy-index", "app", "watch"]);
});
