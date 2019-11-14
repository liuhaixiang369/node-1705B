<template>
    <div class="login">
        <header>{{!flag?'圈子登录':'圈子注册'}}</header>
        <div class="main">
            <input type="text" placeholder="用户名" v-model="ruleForm.username">
            <input type="password" placeholder="登录密码" v-model="ruleForm.password">
            <button @click="!flag?login():registry()">{{!flag?'登录':'注册'}}</button><br/>
            <span v-if="!flag" @click="newUser()">没有账号,快速注册</span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            ruleForm:{
                username:'',
                password:''
            },
            flag:false
        }
    },
    methods:{
        login(){
            this.axios.post('/api/login',{...this.ruleForm}).then((res)=>{
                if(res.data.code===1){
                    this.rese();
                    this.$router.push('/home');
                }else{
                    this.rese();
                    alert('请先注册账号');
                    this.flag=true;
                }
            })
        },
        registry(){
            this.axios.post('/api/registry',{...this.ruleForm}).then((res)=>{
                if(res.data.code===1){
                    this.rese();
                    alert('注册成功');
                    this.flag=false;
                }else{
                    this.rese();
                    alert('用户名不能重复')
                }
            })
        },
        newUser(){
            this.flag=true;
        },
        rese(){
            this.ruleForm={
                name:'',
                pwd:''
            }
        }
    }
}
</script>
<style scoped lang="scss">
    .login{
        width:100%;
        height:100%;
        display: flex;
        flex-direction: column;
        header{
            height:1rem;
            background: rgb(238, 238, 238);
            text-align: center;
            line-height: 1rem;
        }
        .main{
            flex:1;
            input{
                width: 90%;
                height: 0.8rem;
                border:none;
                background: rgb(238, 238, 238);
                margin:0.3rem 0 0 5%;
            }
            button{
                width: 90%;
                height: 0.8rem;
                background: rgb(211, 71, 71);
                color:#fff;
                border:none;
                margin:0.3rem 0 0 5%;
            }
            span{
                height:0.8rem;
                line-height: 0.8rem;
                align-items: left;
                border-bottom: 1px solid #000;
                margin:0.3rem 0 0 5%;
            }
        }
    }
</style>