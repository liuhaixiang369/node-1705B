<template>
    <div class="person">
        <header>
            <b @click="linkTo()" class="iconfont icon-zuojiantou-01"></b>
            <h3>个人信息</h3>
            <span @click="edit()">编辑</span>
        </header>
        <div class="main">
            <p>昵称:<input type="text" v-model="name" :disabled="flag"></p>
            <p>年龄:<input type="text" v-model="age" :disabled="flag"></p>
            <button v-if="!flag" @click="save()">保存</button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            name:'',
            age:'20',
            flag:true
        }
    },
    computed:{

    },
    methods:{
        linkTo(){
            this.$router.go(-1)
        },
        edit(){
            this.flag=false;
        },
        save(){
            this.flag=true;
        }
    },
    created(){
        this.name=localStorage.getItem('username');
    },
    mounted(){

    }
}
</script>
<style scoped lang="scss">
    .person{
        width:100%;
        height:100%;
        display: flex;
        flex-direction: column;
        header{
            width:100%;
            height:1rem;
            background: rgb(247, 245, 245);
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size:0.3rem;
            b{
                margin-left:0.2rem;
            }
            span{
                margin-right:0.3rem;
                color:red;
            }
        }
        .main{
            flex:1;
            p{
                height:1rem;
                margin: 0.2rem 0 0 0.2rem;
                input{
                    width:80%;
                    height:0.8rem;
                    margin-left: 5%;
                    outline: none;
                    border:none;
                    background:#fff;
                }
            }
            button{
                width:4rem;
                height:0.6rem;
                border:none;
                background:red;
                color:#fff;
                margin:0.2rem 0 0 1.75rem;
            }
        }
    }
</style>