const http = require('http');
const childProcess = require('child_process');
const cpuLen = require('os').cpus().length;
const server = http.createServer();

server.listen(7878)
let workers = {};
function createWorker(){
    let worker = childProcess.fork('./worker.js');
    worker.send('server',server)
    workers[worker.pid] = worker;
    console.log("子进程pid"+worker.pid)
    worker.on('message',msg => {
        if(msg.m === 'error'){
            console.log("error"+worker.pid)
            delete workers[worker.pid]
            createWorker()
        }
    })

    worker.on('exit',() => {
        console.log("exit"+worker.pid)
        delete workers[worker.pid]
        createWorker()
    })
}

for(let i = 0;i<cpuLen;i++){
    createWorker()
}

//主进程退出,

process.on('exit',() => {
    for(let pid in workers){
        workers[pid].kill()
    }
})