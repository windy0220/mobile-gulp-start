const gulp = require('gulp');                      //获取gulp
// var browsersync = require('browser-sync').create();//获取browsersync

//删除dist目录下文件
const del=require('del');
gulp.task('clean',function(cb){
    return del(['dist/*'],cb);
})

//操作js文件
const uglify = require('gulp-uglify');               //js压缩插件
const concat = require('gulp-concat');               //js合并插件
const order = require('gulp-order');               //js合并插件
const sourcemaps = require('gulp-sourcemaps');               //js合并插件

const fileList = [
    'src/javascript/app.js',
    'src/javascript/index.js',
];
gulp.task('scripts',async () => {
    await gulp.src(fileList)
    .pipe(sourcemaps.init())
    .pipe(order(fileList))
    .pipe(uglify())               //压缩js文件
    .pipe(concat('app.js'))       //把js文件合并成build.js文件
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js/'))   //把操作好的文件放到dist/js目录下
});

//pagejs 这里的js会单独压缩成一个文件
gulp.task('pageScripts',async () => {
    await gulp.src('src/javascript/page/*')
        .pipe(sourcemaps.init())
        .pipe(uglify())               //压缩js文件
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/page/'))   //把操作好的文件放到dist/js目录下
});

//操作css文件
const cssnano = require('gulp-cssnano');    //css压缩插件
const sass=require('gulp-sass')             //sess文件编译
// const sourcemaps = require('gulp-sourcemaps');
// scss编译成css
gulp.task("style", async () => {
    await gulp.src('src/sass/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError)) // compressed
        .pipe(sourcemaps.write('.'))
        // .pipe(cssnano())
        .pipe(gulp.dest('dist/css/'))
});

//page sass文件
gulp.task("pageStyle", async () => {
    await gulp.src('src/sass/page/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError)) // compressed
        .pipe(sourcemaps.write('.'))
        // .pipe(cssnano())
        .pipe(gulp.dest('dist/css/page'))
});

//监控文件变化，自动更新
gulp.task('watch', function() {
    gulp.watch('src/javascript/**/*.js', gulp.series('scripts'));
    gulp.watch('src/javascript/**/*.js', gulp.series('pageScripts'));
    gulp.watch('src/sass/**/*.scss', gulp.series('style','pageStyle'));
});

gulp.task('start',gulp.series('clean','scripts', 'pageScripts', 'style', 'pageStyle', 'watch'));
gulp.task('build',gulp.series('clean','scripts', 'pageScripts', 'style','pageStyle'));