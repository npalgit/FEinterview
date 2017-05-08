在CSS中，a标签有4种伪类，分别为：

# a:link, a:visited, a:hover, a:active

对其稍有了解的前端er都知道，4个伪类是有固定顺序的(LVHA)，否则很容易出现预期之外的效果。


我见过有酱婶的：lv的包包hao，这倒是实话。
比较奇葩的，我在baidu上输入lvha，竟然自动关联出鹿晗。
还有歪果仁们，则戏称LvHa为爱恨原则。

首先，我再把4个伪类的效果唠叨一遍：

- a:link是a链接的默认样式，即a链接未被点击过时a标签内容在页面上呈现的视觉效果。
- a:visited是a链接被访问过后的样式，即a链接被点击后a标签内容在页面上呈现的视觉效果。
- a:hover是鼠标移动到a链接上面时的样式，即鼠标悬浮在a标签内容上方时，其在页面上呈现的视觉效果。
- a:active是鼠标点击a链接时的样式，即从鼠标按键按下到鼠标按键弹起的过程中，a标签内容在页面上呈现的视觉效果。

我们来分析一下，一个a链接要发生所有的样式，是怎样一个过程：

    首次进入页面时，a链接未被点击过，应该呈现a:link的效果，
    当鼠标移动到a链接上时，应该呈现a:hover的效果，
    当鼠标点击a链接时，应该呈现a:active的效果，
    最后，a链接应该呈现a:visited的效果。

如果，a:link 写在 a:hover 之后，依据 CSS 层叠特性，a:link 将覆盖 a:hover 样式，鼠标移动到a链接上时a:hover将不会生效，这不是我们预期的效果，所以 a:link 要写在 a:hover 前。

如果，a:link 写在 a:active 之后，同理，a:link 覆盖了 a:active 样式，鼠标点击a链接时，a:active 将不会生效，所以，a:link 要写在 a:active 前。
 
如果，a:hover 写在 a:active 之后，那么，a:hover 讲覆盖 a:active 样式，要想点击a链接，一定会先经过鼠标移动到a链接之上这个步骤，所以，当点击a链接时，a:active 将不会生效，所以，a:hover 要写在 a:active 前。

而 a:visited，跟 a:link 类似，它发生在 a:link 之后，a:hover 和 a:active 之前，它的位置，只能在第二位了。