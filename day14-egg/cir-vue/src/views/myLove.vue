<template>
    <div class="myLove">
        <header>
            <b @click="linkTo()" class="iconfont icon-zuojiantou-01"></b>
            <h3>我的收藏</h3>
        </header>
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

    }
}
</script>
<style scoped lang="scss">
    .myLove{
        width:100%;
        height: 100%;
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
        }
    }
</style>