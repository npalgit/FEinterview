http://www.jianshu.com/p/3ce2bd36596e

# 特点
1. 体积小
2. 支持主流浏览器
3. promiseAPI, URI templates
4. 支持拦截器
拦截器是全局的，拦截器可以在请求发送前和发送请求后做一些处理。拦截器在一些场景下会非常有用，比如请求发送前在headers中设置access_token，或者在请求失败时，提供共通的处理方式。

# 发送http请求
get(url, [options])
head(url, [options])
delete(url, [options])
jsonp(url, [options])
post(url, [body], [options])
put(url, [body], [options])
patch(url, [body], [options])

```js
this.$http.get('/someurl',).then((response) => {
  // 响应成功回调
}, (response) => {
  // 响应错误回调
})
```
## response对象
1. 方法
text()	string	以string形式返回response body
json()	Object	以JSON对象形式返回response body
blob()	Blob	以二进制形式返回response body
2. 属性
ok	boolean	响应的HTTP状态码在200~299之间时，该属性为true
status	number	响应的HTTP状态码
statusText	string	响应的状态文本
headers	Object	响应头


## 示例
1. get
```js
this.$http.get(this.apiUrl).then((response) => {
  this.$set('gridData', response.data) 
}).catch(function(response) {            
  console.log(response)        
})
```
2. jsonp
```js
this.$http.jsonp(this.apiurl).then((response) => {
  this.$set('gridData', response.data)
})
```
3. post
```js
vm.$http.post(vm.apiUrl, vm.item).then((response) => {        vm.$set('item', {})                           
}) 
```
## 拦截器
```js
Vue.http.interceptors.push((req, next) => {
  // 请求发送前的处理逻辑

  next((res) => {
    // 请求发送后的处理逻辑
    // 根据请求的状态，response参数会返回给successCallback或errorCallback
    return res;
  })
})