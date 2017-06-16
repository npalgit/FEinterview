# mysql
```js
//连接
var conn = mysql.createConnection({
  host,
  user,
  password,
  database
});

conn.connect((err) => {
  if (err) {
    throw err;
  } 
  ...
});
conn.end()


//操作
conn.query('', (err, result) => {

})


//连接池
var pool = mysql.createPool({
  
})可创建连接池
pool.getConnection()可以共享一个连接，或管理多个连接
pool.getConnection((err, connection) {
  connection.release()放回连接池
  connection.destory()销毁
})


```

## 1. 连接数据库
```js
var mysql = require('mysql');

// 创建连接
var conn = mysql.createConnection({
  host : '127.0.0.1',
  user : 'root',
  password : '123',
  database : 'test'
})

// 创建连接后不论是否成功都会调用
conn.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('connect success');
  }
});

conn.end(() => {
  if (err) {
    throw err;
  } else {
    console.log('connect error');
  }
})
```

## 2. 增删改查

mysql中有个query方法可以用来执行任意正确的sql语句，然后在回调函数里给出执行sql语句后的结果。
query方法是异步执行的，若并列书写多个query方法的话，是不能按照书写顺序依次阻塞式执行的。

1. 查询
```js
conn.query('select * from `user`', (err, result, fields) => {
  if (err) {
    throw err;
  } 
  console.log('select end');
})
/*
select ended! // 先输出

[
	RowDataPacket {                  
	    uid: 1,                        
	    username: 'meizi',            
	    password: 'meizi
	    email: '123@qq.com'
	},      
  		RowDataPacket {                  
	    uid: 2,                        
	    username: 'test',              
	    password: 'test
	    email: '456@qq.com'
	}
]
*/
结果集是一个数组，数组中的每条数据都是一个RowDataPacket对象
可以使用JSON.stringify把result转换为json字符串
```

2. 添加
insert into table-name (field1, field2, ...) values(value1, value2, ...)
insert into table-name set field1 = value1, field2 = value2, ...
```js
conn.query("INSERT INTO `user` SET `username`='qwerty', `password`='741', `email`='qwerty@qq.com'", function(err, result){
    if(err) throw err;
    console.log(result);
});
/*
OkPacket {              
  		fieldCount: 0,        
  		affectedRows: 1,
  		insertId: 4, // 数据插入成功时，对应的主键id
  		serverStatus: 2,      
  		warningCount: 0,      
  		message: '',          
  		protocol41: true,      
  		changedRows: 0
  	}
*/
affectedRows表示数据表中受影响的行数，数据插入成功则为1，失败则为0；
在主键自增的情况下，insertId是数据插入成功后对应的主键id，如果主键不自增，则insertId为0
```

3. 更新
```js
conn.query('UPDATE `user` SET `password`="123456" WHERE `uid`=4', function(err, result){
    if(err) throw err;
    console.log(result);
});
/*
OkPacket {
  		fieldCount: 0,
  		affectedRows: 1,
  		insertId: 0,
  		serverStatus: 2,
  		warningCount: 0,
 		message: '(Rows matched: 1  Changed: 1  Warnings: 0',
  		protocol41: true,
  		changedRows: 1
  	}
*/
成功修改数据： affectedRows：1, changedRows:1
要修改的数据与原数据相同： affectedRows：1, changedRows:0
未找到需要修改的数据： affectedRows：0, changedRows:0
```

4. 删除
```js
conn.query('DELETE FROM `user` WHERE `uid`=4', function(err, result, fields){
    if(err) throw err;
    console.log(result);
});
/*
OkPacket {
  		fieldCount: 0,
  		affectedRows: 1,
  		insertId: 0,
  		serverStatus: 2,
  		warningCount: 0,
 		message: '',
  		protocol41: true,
  		changedRows: 0
  	}
*/
删除成功，则affectedRows为1，删除的数据不存在，则为0。
```

## 连接池：负责分配、管理和释放数据库连接
允许应用程序重复使用一个现有的数据库连接，而不是重新建立一个连接，释放空闲时间超过最大允许空闲时间的数据库连接以避免因为连接未释放而引起的数据库连接遗漏
1. 创建
```js
var pool = mysql.createPool({
  host,
  user,
  password,
  database
})

pool.query('', (err, result) => {
  if (err)
    throw err;
  
  pool.end((err) => {
    console.log(`connection end`);
  })
})
```

2. 共享
getConnection()
connection.release()放回
connection.destory()销毁

```js
var mysql = require('mysql');

var pool = mysql.createPool({
    host : '127.0.0.1',
    user : 'root',
    password : '123',
    database : 'test'
})

pool.getConnection(function(err, connection){
    if(err) throw err;

    connection.query('SELECT * FROM `user`', function(err, result){
        if(err) throw err;

        console.log(result);

        connection.release();//将连接返回到连接池中，这个连接可以被其它人重复使用
    })
});
```

3. 连接池事件 connection
连接池中产生新连接时会发送’connection’事件：
```js
pool.on('connection', function (connection) {
  	console.log('new connection');
});

```

4. query 和 getConnection 区别
在pool.getConnection中的connection在其回调函数里是一直的，可以保证这一系列的操作都是在同一个connection中执行的；pool.query则每次执行时可能会在不同的connection中执行，可能会得到意想不到的结果

## 4. sql防注入
**sql防注入的关键就是不能直接把数据拼接到sql语句中，必须得对数据进行转义，或者使用提供的方法拼接sql语句**

1. escape()对参数进行编码转义
参数编码方法有：
mysql.escape()
connection.escape()
pool.escape()

2. 占位符
可以使用?作为参数占位符。在使用查询参数占位符时，在其内部自动调用 connection.escape() 方法对传入参数进行编码。

3. 使用mysql.format()转义参数


## 多语句查询
**出于安全考虑node-mysql默认禁止多语句查询（可以防止SQL注入）**
```js
//启用多语句查询可以将multipleStatements选项设置为true：
var connection = mysql.createConnection({multipleStatements: true});
```