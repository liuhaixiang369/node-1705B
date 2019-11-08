const cluster=require('cluster');
const http=require('http');
const cpus=require('os').cpus().length;

if(cluster.ismaster){//判断是不是主进程
    for(let i=0;i<cpus;i++){
        cluster.fork();
    }
}else{//子进程
    let server=http.createServer((req,res)=>{

    }).listen(3000);
}
