const http = require('http');

//创建一个服务器
let childServer = http.createServer((req,res) => {
    if(req.url === '/list'){
        res.end('list')
    }else if(req.url === '/error'){
        throw Error('error')
    }else{
        res.end('ok')
    }
})

process.on('message',(m,server) => {
    if(m === 'server' && server){
        server.on('connection',(socket) => {
            childServer.emit('connection',socket)
        })
    }
})
//捕捉异常
process.on('uncaughtException',() => {
    //有异常
    console.log("有异常")
    process.send({m:'error'})
})