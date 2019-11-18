<template>
    <div class="comment">
        <header>
            <b @click="linkTo()" class="iconfont icon-zuojiantou-01"></b>
            <h3>我的评论</h3>
        </header>
        <div class="main">
            <p>
                <router-link to="/comment/mycomt">收到的评论</router-link>
                <router-link to="/comment/outcomt">给他人评论</router-link>
            </p>
            <router-view/>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        linkTo(){
            this.$router.go(-1)
        }
    },
    created(){

    },
}
</script>
<style scoped lang="scss">
    .comment{
        width:100%;
        height:100%;
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
                display: flex;
                justify-content: space-around;
                align-items: center;
                a{
                    text-decoration: none;
                    color:#000;
                }
                .router-link-active{
                    color:red;
                }
            }
        }
    }
</style>