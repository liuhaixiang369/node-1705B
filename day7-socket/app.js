const webScoket=require('ws');
const webServer=webScoket.Server;
const http=require('http');
const fs=require('fs');
const arr=[];

const wss=new webServer({
    port:3000,
    host:'169.254.204.99'
})
let testAll=(data,type,ws)=>{
    arr.forEach(item => {
        if(!(item===ws)){
            item.send(JSON.stringify({data,type}))
        }
    });
}

wss.on('connection', function (ws) {
    arr.push(ws);
    testAll(`有一位用户进入群聊,当前用户${arr.length}位`,'alert');
    ws.on('message',(message)=>{
        testAll(message,'msg',ws);
    })
    ws.on('close',(ws)=>{
        let index=arr.find(item=>item===ws);
        arr.splice(index,1);
        testAll(`有一位用户退出群聊,当前用户${arr.length}位`,'alert');
    })
});

http.createServer((req,res)=>{
    if(req.url==='/'){
        res.end(fs.readFileSync('./src/app.html'))
    }else if(req.url === '/static/1.jpg'){
        let buf = fs.readFileSync('./src/static/1.jpg');
        res.end(buf);
    }
    let home=res.end(fs.readFileSync('./src/index.html'))
    res.end(home)
}).listen(8000,()=>console.log('port is 8000'));