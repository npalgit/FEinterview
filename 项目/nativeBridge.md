# qwebchannel: c++ <-websocket-> html
- C++和HTML通过websocket通信，通过官方的qwebchannel.js实现。
- C++和HTML共用一个对象并以此进行通信 
- C++通知HTML：通过信号
- HTML通知C++：直接调用其函数
- 核心类：QWebChannel 



http://blog.csdn.net/imxiangzi/article/details/52525031
实例：
http://blog.csdn.net/liuyez123/article/details/50509788

PreviewPage类用于加载HTML页面，在主界面MainWidget类初始化的时候，将他主界面中的WebEngineView初始化为该实例对象

```js
//web页面
<scripttype="text/javascript"src="./qwebchannel.js"></script>

 window.onload=function(){

  newQWebChannel(qt.webChannelTransport,function(channel){

                //makedialogobjectaccessibleglobally
  varcontent=channel.objects.content;

 

                document.getElementById("send").onclick=function(){

                    varinput=document.getElementById("input");

                    vartext=input.value;

                    if(!text){

                        return;

                    }

 

                    output("Sentmessage:"+text);

                    input.value="";

                    content.receiveText(text);

                }

 

                content.sendText.connect(function(message){

                    output("Receivedmessage:"+message);

                });

 

                content.receiveText("Clientconnected,readytosend/receivemessages!");

                output("ConnectedtoWebChannel,readytosend/receivemessages!");

           });


