## 1. hello world
```js
var http = require('http');//引入http模块
http.createServer((req, res) => {
  response.writeHead(200, {'content-type': 'text/plain'}); // 设置头部信息，输出text文本
  response.write('hello world'); // 输出到页面中的信息
  response.end(); // 返回结束
}).listen(3000);
```
## 2.1 form 表单-get
```js
var http = require('http');
var url = require('url');

http.createServer(function(request, response){
    var html = '<html>\
        <head>\
        <meta charset=UTF-8" />\
        </head>\
        <body>\
        <form action="/" method="get">\
        <p>username : <input type="text" name="username" /></p>\
        <p>password : <input type="password" name="password" /></p>\
        <p>age : <input type="text" name="age" /></p>\
        <p><input type="submit" value="submit" name="submit" /></p>\
        </form>\
        </body>\
        </html>';
    
    var query = url.parse( request.url, true ).query;
    if( query.submit ){
        var data = '<p><a href="/">back</a></p>'+
            '<p>username:'+query.username+'</p>'+
            '<p>password:'+query.password+'</p>'+
            '<p>age:'+query.age+'</p>';
         
        response.writeHead(200, {'content-type': 'text/html'});
        response.write(data);
    }else{
        response.writeHead(200, {'content-type': 'text/html'});
        response.write(html);
    }
    response.end(); // 结束
}).listen(3000);
console.log('server has started...');
```
url.parse()是用来解析URL字符串的，并返回解析后的URL对象
第2个参数设置为true，则会将返回结果中的query属性解析为一个对象，其他属性不变

## 2.2. form 表单-post
非阻塞方式传输数据：data事件（表示新的小数据块到达了）和end事件传递这些小数据块（表示所有的数据都已经接收完毕）。 
所以：在data事件中获取数据块，在end事件中操作数据。

```js
// server.js
var http = require('http'),
querystring = require('querystring');

http.createServer(function(request, response){
    var html = '<html>\
        <head>\
        <meta charset=UTF-8" />\
        </head>\
        <body>\
        <form action="/" method="post">\
        <p>username : <input type="text" name="username" /></p>\
        <p>password : <input type="password" name="password" /></p>\
        <p>age : <input type="text" name="age" /></p>\
        <p><input type="submit" value="submit" name="submit" /></p>\
        </form>\
        </body>\
        </html>';
    
    if( request.method.toLowerCase()=='post' ){
        var postData = '';

        request.addListener('data', function(chunk){
            postData += chunk;
        });

        request.addListener('end', function(){
            var data = querystring.parse(postData);
            console.log( 'postData: '+postData );
            console.log(data);
    
            var s = '<p><a href="/">back</a></p>'+
                '<p>username:'+data.username+'</p>'+
                '<p>password:'+data.password+'</p>'+
                '<p>age:'+data.age+'</p>';

            response.writeHead(200, {'content-type': 'text/html'});
            response.write(s);
            response.end();
        })
    }else{
        response.writeHead(200, {'content-type': 'text/html'});
        response.write(html);
        response.end();
    }
}).listen(3000);
console.log('server has started...');
```
1. 引入querystring模块
2. request.method.toLowerCase() === 'post'判断是否有数据提交
3. data事件中数据拼接，end事件中处理
 request.addListener('data',(chunk) => {

 })
 request.addListener('end', () => {

 })
 4. querystring.parse(postData)解析postData

## 3. 路由

1. start.js 页面初始化
```js
//start.js 页面初始化
function start(request, response){
    var html = '<html>\
        <head>\
        <meta charset=UTF-8" />\
        </head>\
        <body>\
        <form action="/show" method="post">\
        <p>username : <input type="text" name="username" /></p>\
        <p>password : <input type="password" name="password" /></p>\
        <p>age : <input type="text" name="age" /></p>\
        <p><input type="submit" value="submit" name="submit" /></p>\
        </form>\
        </body>\
        </html>';
    
    response.writeHead(200, {"Content-Type":"text/html"});
    response.write( html );
    response.end();
}
exports.start = start;
```
2. upload.js展示数据
```js
var querystring = require('querystring');

function upload(request, response){
    var postData = '';

    request.addListener('data', function(chunk){
      postData += chunk;
    });
    
    request.addListener('end', function(){
        var data = querystring.parse(postData);
        console.log( 'postData: '+postData );
        console.log(data);

        var s = '<p><a href="/">back</a></p>'+
            '<p>username:'+data.username+'</p>'+
            '<p>password:'+data.password+'</p>'+
            '<p>age:'+data.age+'</p>';

        response.writeHead(200, {'content-type': 'text/html'});
        response.write(s);
        response.end();
    })
}
exports.upload = upload;
```

3. server.js路由选择
```js
var http = require('http'),
url = require('url'),
starter = require('./starter'),
uploader = require('./uploader');

http.createServer(function(request, response){
    var pathname = url.parse(request.url).pathname;
    var routeurl = {
        '/' : starter.start,
        '/show' : uploader.upload
    }

    if( typeof routeurl[pathname]=== 'function' ){
        routeurl[pathname](request, response);
    }else{
        console.log('404 not found!');
        response.end();
    }
}).listen(3000);
console.log('server has started...');
```
如果匹配到路由 / ，则执行 starter.start(request, response) ；如果匹配到路由 /show ，则执行 uploader.upload(request, response) 。如果都没匹配到，则显示404。

## 4.1 图片上传
formidable模块：解析上传的文件数据
fs模块：读取文件
util模块：提供常用函数的集合
1. start.js初始化页面,添加file控件上传文件
```js
function start(request, response){
    var html = '<html>\
        <head>\
        <meta charset=UTF-8" />\
        </head>\
        <body>\
        <form action="/upload" method="post" enctype="multipart/form-data">\
        <p>file : <input type="file" name="upload" multiple="multiple" /></p>\
        <p><input type="submit" value="submit" name="submit" /></p>\
        </form>\
        </body>\
        </html>';

    response.writeHead(200, {"Content-Type":"text/html"});
    response.write( html );
    response.end();
}
exports.start = start;
```
2. upload.js上传图片
```js
var formidable = require('formidable'),
util = require('util'),
fs = require('fs');

function upload(request, response){
    if( request.method.toLowerCase()=='post' ){
        var form = new formidable.IncomingForm();

        form.uploadDir = './tmp/';
        form.parse(request, function(err, fields, files) {
            var oldname = files.upload.name,
                newname = Date.now() + oldname.substr(oldname.lastIndexOf('.'));
            fs.renameSync(files.upload.path, "./img/"+newname ); // 上传到 img 目录

            response.writeHead(200, {'content-type': 'text/plain'});
            response.write('received upload:\n\n');
            response.end(util.inspect({fields: fields, files: files}));
        });
        return;
    }
}
exports.upload = upload;
```
我们再查看img目录时，就会发现我们刚才上传的照片了。

## 4.2 显示图片
1. show.js展示图片
```js
var fs = require('fs'),
url = require('url');

function show(request, response){
    var query = url.parse(request.url, true).query,
        imgurl = query.src;

    // 读取图片并进行输出
    // 这里读取链接中的src参数，指定读取哪张图片  /show?src=1484234660592.png
    fs.readFile('./img/'+imgurl, "binary", function(err, file){
         if(err) throw err;
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    })
}
exports.show = show;
```

2. server.js添加路由映射
```js
var routeurl = {
    '/' : starter.start,
    '/upload' : uploader.upload,
    '/show' : shower.show // 添加
};
```

3. upload.js中对图片进行引用
```js
form.parse(request, function(err, fields, files) {
    var oldname = files.upload.name,
        newname = Date.now() + oldname.substr(oldname.lastIndexOf('.'));
    fs.renameSync(files.upload.path, "./img/"+newname ); // 同步上传图片

    response.writeHead(200, {'content-type': 'text/html'});
    var s = '<p><a href="/">back</a></p><p><img src="/show?src='+newname+'" /></p>'; // 显示刚才的图片
    response.write(s);
    response.end();
});
```
img路由到show

## 5. json(p)接口
1. init.js处理json请求
```js
var url = require('url');

function init(request, response){
    if( request.method.toLowerCase()=='get' ){
        var query = url.parse(request.url, true).query;

        var data = {"code":0, "msg":"success", "data":[{"username":"wenzi", "age":26}, {"username":"bing", "age":25}]};
        if( query && query.callback ){
            // jsonp
            response.end( query.callback + '(' + JSON.stringify(data) + ')' );
         }else{
            // json
            response.end( JSON.stringify(data) );
        }
    }
}
exports.init = init;
```
2. 在server.js中添加inter的引用和路由映射
```js
var routeurl = {
    '/' : starter.start,
    '/upload' : uploader.upload,
    '/show' : shower.show,
    '/inter' : inter.init // 添加
};
```