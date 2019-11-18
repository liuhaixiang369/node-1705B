<template>
  <div class="home">
    <header>
      <span @click="alert()"><i class="iconfont icon-Instagram"></i></span>
      <input type="text" placeholder="试试搜索你的好友名字">
    </header>
    <div class="main">
      <div class="kay" v-for="(item) in data" :key="item.id">
        <dl>
          <dt><img :src="item.head" alt=""></dt>
          <dd>
            <p>
              <span>{{item.name}}</span>
              <span class="mylove">★</span>
            </p>
            <p>{{item.time}}</p>
          </dd>
        </dl>
        <div class="cont">
          <p><img :src="item.img" alt=""></p>
          <p>{{item.txt}}</p>
          <p>
            <span><i class="iconfont icon-dianzan"></i>{{item.like}}</span>
            <span class="comt"><i class="iconfont icon-xiaoxi"></i></span>
          </p>
        </div>
      </div>
    </div>
    <div class="footer">
      <router-link to="/home"><i class="iconfont icon-pengyouquan"></i>&nbsp;圈子</router-link>
      <router-link to="/my"><i class="iconfont icon-wode"></i>&nbsp;我的</router-link>
    </div>
    <div class="alert" v-show="flag">
      <div class="popup">
        <input type="text" placeholder="输入要发布的文本内容" v-model="txt">
        <b>
          <p>+</p>
          <p>上传图片</p>
          <img :src="img" alt="">
        </b>
        <p>只支持.jpg格式</p>
        <button @click="out()" class="out">取消</button>
        <button @click="add()">发布</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      data:[],
      flag:false,
      img:'',
      txt:'',
      like:0
    }
  },
  methods:{
    alert(){
      this.flag=true;
    },
    out(){
      this.flag=false;
    },
    add(){
      let {img,txt,like}=this;
      let name=localStorage.getItem('username');
      let date=new Date();
      let nian=date.getFullYear();  
      let yue=date.getMonth();
      let ri=date.getDate();
      let time=`${nian}-${yue}-${ri}`;
      this.axios.get('api/head',{params:{name}}).then(res=>{
        if(res.data.code===1){
          let {head}=res.data.data[0];
          this.axios.post('/api/add',{img,txt,name,time,head,like}).then(res=>{
            console.log(res)
          })
        }
      })
    }
  },
  created(){
    this.axios.get('/api/list').then(res=>{
      if(res.data.code===1){
        this.data=res.data.data
      }
    })
  },
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
        background: #fff;
        line-height: 1rem;
        span{
          display: inline-block;
          width:20%;
          text-align: center;
          color:rgb(211, 73, 73);
          i{
            font-size: 0.5rem;
            vertical-align: middle;
          }
        }
        input{
          width:70%;
          height: 0.6rem;
          background: rgb(240, 240, 240);
          border-radius: 15px;
          outline: none;
          border:none;
          &{
            text-align: center;
          }
        }
    }
    .main{
      flex:1;
      overflow: auto;
      .kay{
        width:90%;
        margin:0.2rem 0 0 5%;
        dl{
          width:100%;
          height:1rem;
          display: flex;
          dt{
            width:1rem;
            height:1rem;
            img{
              width:100%;
              height:100%;
              border-radius: 50%;
            }
          }
          dd{
            width:80%;
            margin-left: 0.3rem;
            line-height: 0.5rem;
            p{
              &:nth-child(1){
                display: flex;
                justify-content:space-between;
                .mylove{
                  color:rgb(136, 136, 136);
                  font-size: 0.4rem;
                }
              }
            }
          }
        }
        .cont{
          width:100%;
          margin-top:0.2rem;
          p{
            &:nth-child(3){
              width:100%;
              height:0.8rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 1px solid red;
              .comt{
                margin-right: 0.3rem;
              }
              i{
                color:red;
              }
            }
            img{
              width:2rem;
              height:2rem;
              border:1px solid #ccc;
            }
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
    .alert{
      width:100%;
      height:100%;
      position: fixed;
      left:0;
      top:0;
      background: rgba(0, 0,0, .5);
      .popup{
        width:80%;
        height:5rem;
        background: #fff;
        margin:2rem 0 0 10%;
        p{
          color:#ccc;
        }
        button{
          border:none;
          color:red;
          background: #fff;
          width:1.5rem;
          margin-top:0.3rem;
        }
        .out{
          margin-left:35%;
        }
        input{
          width:90%;
          height:0.8rem;
          margin:0.2rem 0 0.2rem 5%;
          border:none;
        }
        b{
          display: inline-block;
          width:2rem;
          height:2rem;
          margin-left: 5%;
          background: rgb(255, 255, 255);
          border:1px solid #ccc;
          text-align: center;
          p{
            line-height: 1rem;
            &:nth-child(1){
              font-size: 1rem;
            }
          }
        }
      }
    }
  }
</style>
