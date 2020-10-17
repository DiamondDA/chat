var http = require('http');
var fs = require('fs');
var ws = require('socket.io'); //引入socket.io
 
var server = http.createServer(function (req, res) {
    var html = fs.readFileSync('./client.html'); 
   //client.html是发送给客户端的文件(客户端界面)
 
    res.end(html);
}).listen(8000);
 
var io = ws(server); //http服务与ws服务相关联, 返回io服务实例
 
//监听用户的连接事件
io.on('connection',function (socket) {      
    //发生在用户连接io服务器时
    console.log('有新用户进入房间');
 
    //消息发送事件
    socket.on('message',function (obj) {
       console.log(obj);
       io.emit('message',obj); //发送消息给所有客户端（广播）
    });
});
