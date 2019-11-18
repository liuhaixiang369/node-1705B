const jwt=require('jsonwebtoken');

const whitelist=[
    '/api/login',
    '/api/registry',
    '/api/list'
]

module.exports=()=>{
    return async (ctx,next)=>{
        let token = ctx.cookies.get('token');
        if(whitelist.includes(ctx.path)){
            await next();
        }else{
            try{
                const into=jwt.verify(token,'liuhx');
                ctx.into=into;
                await next();
            }catch(e){
                ctx.body={
                    code:3,
                    msg:'token失效'
                }
            }
        }
    }
}