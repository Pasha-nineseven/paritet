var gulp = 			require('gulp');
	sass = 			require('gulp-sass');
	browserSync = 	require('browser-sync');
    concat =        require('gulp-concat');
    uglify =        require('gulp-uglifyjs');
    cssnano =       require('gulp-cssnano');
    rename =        require('gulp-rename');
    del =           require('del');
    imagemin =      require('gulp-imagemin');
    pngquant =      require('imagemin-pngquant');
    cache =         require('gulp-cache');
    autoprefixer =  require('gulp-autoprefixer');
    fileinclude =   require('gulp-file-include');
	watch = 		require('gulp-watch');
    wait =          require('gulp-wait');


gulp.task('sass', function(){
	return gulp.src('app/scss/*.scss')
    .pipe(wait(500))
	.pipe(sass())
    .pipe(autoprefixer(['last 15 versions']))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});

//SCRIPTS concat+uglify
gulp.task('scripts', function(){
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/jquery-ui/jquery-ui.js',
        'app/libs/jquery-ui/ui-touch-punch.js',
        'app/libs/modernizr/modernizr.min.js',
        'app/libs/flexibility/flexibility.js',
        'app/libs/fancybox/jquery.fancybox.js',
        'app/libs/slick/slick.min.js',
        'app/libs/tooltip/tooltipster.bundle.min.js',
        'app/libs/formstyler/jquery.formstyler.min.js',
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/libs.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(gulp.dest('build/css'))
});

gulp.task('browser-sync', function() {
    browserSync({
    	server: {
    		baseDir: 'app',
    	},
    	notify: false
    })
});


// gulp.task('fileinclude', function () {
//     gulp.src('app/*.html')
//         .pipe(fileinclude({
//           prefix: '@@',
//           basepath: '@file'
//         }))
//         .pipe(gulp.dest('app/*.html'));
//         // build?
// });


gulp.task('watch', ['browser-sync','css-libs', 'scripts',], function() {
    gulp.watch(['app/scss/*.scss' , 'app/scss/components/*.scss','app/scss/pages/*.scss'],  ['sass']); // Наблюдение за sass файлами
    // Наблюдение за другими типами файлов
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});


//CLEAN
gulp.task('clean', function() {
    return del.sync('build');
});


//IMAGEMIN
gulp.task('img', function(){
    return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
        interlaced:true,
        progrssive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    })))
    .pipe(gulp.dest('build/img'))
});

//BUILD version
gulp.task('build', ['clean', 'img', 'sass', 'css-libs', 'scripts'], function() {

    var buildCss = gulp.src([
        'app/css/style.css',
        'app/css/libs.min.css'
        ])
    .pipe(gulp.dest('build/css'))

    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('build/fonts'))

    var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('build/js'))

    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('build'));

});

//CLEAR CACHE
gulp.task('clear', function() {
    return cache.clearAll();
});


//DEFAULT
gulp.task('default', ['watch','browser-sync','css-libs', 'scripts',]);