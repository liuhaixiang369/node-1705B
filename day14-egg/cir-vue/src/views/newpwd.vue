<template>
    <div class="newpwd">
        <header>
            <b @click="linkTo()" class="iconfont icon-zuojiantou-01"></b>
            <h3>更改密码</h3>
        </header>
        <div class="main">
            <p><input type="password" placeholder="请输入原密码" v-model="pwd"></p>
            <p><input type="password" placeholder="请输入新密码" v-model="password"></p>
            <p>密码长度8-32位，须包含数字、字母。</p>
            <button @click="yesEdit()">确认提交</button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            pwd:'',
            password:''
        }
    },
    methods:{
        linkTo(){
            this.$router.go(-1)
        },
        yesEdit(){
            if(localStorage.getItem('password')==this.pwd){
                let {password,pwd}=this;
                let username=localStorage.getItem('username');
                this.axios.post('/api/update',{username,password,pwd}).then(res=>{
                    if(res.data.code===1){
                        this.$router.push('/login')
                    }
                })
            }else{
                alert('原密码输入不一致')
            }
        }
    },
    created(){

    }
}
</script>
<style scoped lang="scss">
    .newpwd{
        width:100%;
        height:100%;
        background: rgb(240, 240, 240);
        display: flex;
        flex-direction: column;
        header{
            width:100%;
            height:1rem;
            line-height: 1rem;
            background: rgb(247, 245, 245);
            font-size:0.3rem;
            b{
                margin-left:0.3rem;
            }
            h3{
                display: inline-block;
                margin-left: 35%;
            }
        }
        .main{
            flex:1;
            p{
                height:1rem;
                margin-top: 0.2rem;
                input{
                    width:90%;
                    height:0.8rem;
                    margin-left: 5%;
                    outline: none;
                    border:none;
                }
                &:nth-child(3){
                    margin-left: 5%;
                    font-size: 0.2rem;
                    color:rgb(136, 136, 136);
                }
            }
            button{
                width:90%;
                height:0.8rem;
                background: rgb(238, 104, 104);
                color:#fff;
                margin-left: 5%;
                border:none;
            }
        }
    }
</style>