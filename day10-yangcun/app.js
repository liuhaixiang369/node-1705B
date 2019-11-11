const koa=require('koa');
const app=new koa();

app.use(async (ctx,next)=>{
    console.log('1')
    await next();
    console.log('1结束')
})
app.use(async (ctx,next)=>{
    console.log('2')
    await next();
    console.log('2结束')
})
app.use(async (ctx,next)=>{
    console.log('3')
    await next();
    console.log('3结束')
})

app.listen(process.env.PORT || 3000,()=>{
    console.log('port is 3000')
})