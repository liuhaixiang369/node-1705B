const download=require('download-git-repo');
const {exec}=require('child_process');

download('github:xiaodanli/vue-demo','test',(error)=>{
    if(error){
        throw error
    }
    process.chdir('./test/vue-demo');
    exec('npm install');
    console.log('成功')
})