<template>
    <div class="my">
        <header>
            <dl>
                <dt><img :src="data[0].head" alt=""></dt>
                <dd>
                    <p>{{data[0].name}}</p>
                    <p>年龄：{{data[0].age}}</p>
                </dd>
            </dl>
        </header>
        <div class="main">
            <div class="top">
                <p @click="person()">
                    <span><i class="iconfont icon-yonghu"></i>个人信息</span>
                    <span class="">></span>
                </p>
                <p @click="comment()">
                    <span><i class="iconfont icon-xiaoxi"></i>我的评论</span>
                    <span>></span>
                </p>
                <p @click="myLove()">
                    <span><i class="iconfont icon-pingfen"></i>个人收藏</span>
                    <span>></span>
                </p>
            </div>
            <div class="btm">
                <p @click="edit()"><i class="iconfont icon-set"></i>修改密码</p>
                <p @click="out()"><i class="iconfont icon-tuichu"></i>退出</p>
                <p @click="del()"><i class="iconfont icon-shanchu-01"></i>注销用户</p>
            </div>
        </div>
        <div class="footer">
            <router-link to="/home"><i class="iconfont icon-pengyouquan"></i>&nbsp;圈子</router-link>
            <router-link to="/my"><i class="iconfont icon-wode"></i>&nbsp;我的</router-link>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            data:[],
            username:''
        }
    },
    methods:{
        del(){
            let {username}=this;
            this.axios.get('/api/del',{params:{username}}).then(res=>{
                if(res.data.code===1){
                    this.$router.push('/login');
                }
            })
        },
        edit(){
            this.$router.push('/newpwd');
        },
        out(){
            this.$router.push('/login')
        },
        person(){
            this.$router.push('/person')
        },
        comment(){
            this.$router.push('/comment')
        },
        myLove(){
            this.$router.push('/myLove')
        }
    },
    created(){
        this.username=localStorage.getItem('username');
        let {username}=this;
        this.axios.post('/api/user',{username}).then(res=>{
            console.log(res.data.data)
            if(res.data.code===1){
                this.data=res.data.data
            }
        })
    }
}
</script>
<style scoped lang="scss">
    .my{
        width:100%;
        height:100%;
        display:flex;
        flex-direction: column;
        background:rgb(240, 240, 240);
        header{
            width:100%;
            height:2rem;
            background: rgb(214, 84, 84);
            color:#fff;
            dl{
                width:100%;
                height:1rem;
                margin-top: 0.5rem;
                display: flex;
                dt{
                    width:1rem;
                    height:1rem;
                    margin-left: 0.4rem;
                    img{
                        width:100%;
                        height:100%;
                        border-radius: 50%;
                    }
                }
                dd{
                    margin-left: 0.4rem;
                    line-height: 0.4rem;
                }
            }
        }
        .main{
            flex:1;
            .top{
                width:100%;
                background: #fff;
                margin-top:0.5rem;
                p{
                    height:0.8rem;
                    line-height: 0.8rem;
                    display: flex;
                    justify-content: space-between;
                    &{
                        i{
                            color:red;
                            margin:0 0.3rem 0 0.3rem;
                        }
                    }
                    &{
                        span:nth-child(2){
                            margin-right:0.3rem;
                        }
                    }
                }
            }
            .btm{
                width:100%;
                background: #fff;
                margin-top:0.5rem;
                p{
                    height:0.8rem;
                    line-height: 0.8rem;
                    i{
                        color:red;
                        margin:0 0.3rem 0 0.3rem;
                    }
                }
            }
        }
        .footer{
            display: flex;
            justify-content: space-around;
            height:1rem;
            background: rgb(238, 238, 238);
            line-height: 1rem;
            a{
                text-decoration: none;
                color:#000;
            }
            .router-link-active{
                color:red;
            }
        }
    }
</style>