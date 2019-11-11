const koa=require('koa');
const app=new koa();
const router=require('./router/index.js');
const bodyparser=require('koa-bodyparser');

app.use(bodyparser());

app.use(router.routes());

app.listen(process.env.PORT||3000,()=>{
    console.log('port is 3000')
})