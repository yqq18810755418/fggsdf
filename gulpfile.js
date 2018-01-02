var  gulp = require('gulp');
var  minify = require('gulp-minify-css');
var  concat = require('gulp-concat');
var webserver = require('gulp-webserver');
var uglify = require('gulp-uglify');
var fs = require('fs');
var path = require('path');
//拷贝
gulp.task('copy',function(){
	gulp.src('data/demo.html')
		.pipe(gulp.dest('new'))

})
//压缩
gulp.task('min',function(){
	gulp.src('script/data_formate.js')
		.pipe(concat('data_formate.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('script'))
})

gulp.task('web',function(){
	gulp.src('.')
		.pipe(webserver({
			host:'localhost',
			port:8090
			
		}))
})

gulp.task('server',function(){
	gulp.src('.')
		.pipe(webserver({
			host:'localhost',
			port:8080,
			livereload:true,
			middleware:function(req,res,next){
				if(req.url ==='/favicon.ico'){
					return
				}
				if(req.url ==='/index'){
					res.writeHead(200,{
						'content-type':'text-json;charset=utf-8',
						'Access-Control-Allow-Origin':'*'
					})
					res.end(fs.readFile(path.join(__dirname)))
				}
				next();
			}
		}))
})
gulp.task('default',['server','web'])