# Array 
1. 基本
.length
.toString()
.valueOf()

2. Array.isArray()
3. 栈，队列
push()
pop()
shift() 取第一个
unshift() 添加到第一项
4. 排序
reverse()
sort()
```js
arr.sort(funtion(x, y) {
    return x-y;//升序
})
```
5. 操作
.concat() 添加，返回新的
.slice(start，end) 截取，返回新的

.splice(start, count, new) 操作原数组
splice(0, 2)//0项开始，删除2个
splice(2, 0, "red")//2项开始，添加一个
splice(2, 1, "red") //2项开始，删除1个，添加一个

6. 查找位置
.indexOf()
.lastIndexOf()

7. 迭代
.every() 每一项都返回true，才返回true
.some() 只要有一项返回true，就返回true

.filter() 返回 返回true项 组成的数组
.forEach() 运行指定函数
.map() 返回 结果 组成的数组

8. 归并
.reduce()
.reduceRight()
```js
var value = [1,2,3,4,5];
var sum = value.reduce(function(pre, cur, index, array) {
    return pre + cur;
})
```

9. 字符串
.join() 返回字符串


# String
1. 
.length 
**没有()**
2. 
.charAt()
.charCodeAt() 字符编码

3. 
.concat() 拼接, 返回新的
.slice(start, end) 截取，返回新的
负值：（负值+长度， 负值+长度）

.substring(start, end) 返回新的
负值：（0， 0）

.substr(start, count) 返回新的
负值：（负值+长度，0）

4. 查找
.indexOf()
.lastIndexOf()
5. 去除空格
.trim() 
6. 大小写
.toUpperCase()
.toLowerCase()
.toLocalUpperCase()
.toLocalLowerCase()
7. 正则
.match()
.search()
.replace()
8. 转数组
.split()

