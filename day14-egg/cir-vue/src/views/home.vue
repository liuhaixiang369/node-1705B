<template>
  <div class="home">
    <header>
      <span><i></i></span>
      <input type="text" placeholder="试试搜索你的好友名字">
    </header>
    <div class="main">

    </div>
    <div class="footer">
      <router-link to="/home">圈子</router-link>
      <router-link to="/my">我的</router-link>
    </div>
  </div>
</template>
<script>
export default {
  props:{

  },
  components:{

  },
  data(){
    return {

    }
  },
  computed:{

  },
  methods:{

  },
  created(){

  },
  mounted(){

  }
}
</script>
<style scoped lang="scss">
  .home{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    header{
        height:1rem;
        background: rgb(238, 238, 238);
        line-height: 1rem;
        input{
          width:70%;
          height: 0.6rem;
          background: #ccc;
          vertical-align: middle;
        }
    }
    .main{
      flex:1;
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
