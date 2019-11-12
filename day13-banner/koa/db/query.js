const connection=require('./index.js');

function query(sql,params=[]){
    return new Promise((resolve,reject)=>{
        connection.query(sql,params,(err,data)=>{
            if(err){
                reject({msg:'error',err})
            }else{
                resolve({msg:'success',data})
            }
        })
    })
}
module.exports=query;
