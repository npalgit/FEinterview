## MVC
view: 用户界面
controller: 业务逻辑
model: 数据保存

![](http://image.beekka.com/blog/2015/bg2015020105.png)

view->controller
controller->model
model->view

## MVP 双向通信
presenter
![](http://image.beekka.com/blog/2015/bg2015020109.png)

view <-> presenter <-> model

## MVVM
viewModel
![](http://image.beekka.com/blog/2015/bg2015020110.png)

view - viewModel（**双向绑定，view变动自动反应到viewModel，反之同理**）
viewModel <-> model

http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html