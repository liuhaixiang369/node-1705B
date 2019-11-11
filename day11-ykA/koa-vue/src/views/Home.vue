<template>
  <div class="home">
    <el-button type="primary" @click="addItem">添加</el-button>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="序号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="time"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="120">
    </el-table-column>
    <el-table-column
      prop="auth"
      label="作者"
      width="120">
    </el-table-column>
    <el-table-column
      prop="isagain"
      label="重要性"
      width="120">
    </el-table-column>
    <el-table-column
      prop="num"
      label="阅读数"
      width="150">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="120">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="del(scope.row.id)" type="text" size="small">删除</el-button>
        <el-button type="text" size="small" @click="edit(scope.row.id)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    title="添加/修改用户"
    :visible.sync="flag"
    width="30%"
    center>
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="日期" prop="time">
        <el-date-picker
          v-model="ruleForm.time"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input type="text" v-model="ruleForm.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="auth">
        <el-input type="text" v-model="ruleForm.auth" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="重要性" prop="isagain">
        <el-input type="text" v-model="ruleForm.isagain" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="阅读数" prop="num">
        <el-input type="text" v-model="ruleForm.num" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio label="draft">draft</el-radio>
          <el-radio label="published">published</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="add">{{editId?'修改':'添加'}}</el-button>
    </span>
  </el-dialog>
  <p class="p">
    <button class="prev" @click="prev">上一页</button>
    <span v-for="index in total" :key="index">{{index}}</span>
    <button class="next" @click="next">下一页</button>
  </p>
  </div>
</template>
<script>
export default {
  data(){
    return {
      tableData: [],
      pageNum:1,
      limit:5,
      flag: false,
      ruleForm:{
        time:'',
        title:'',
        auth:'',
        isagain:'',
        num:'',
        status:''
      },
      editId:'',
      total:0
    }
  },
  methods:{
    //删除
    del(id) {
      this.axios.get('/api/delete',{params:{id}}).then((res)=>{
        if(res.data.code===1){
          this.getData();
        }
      })
    },
    //获取数据
    getData(){
      let {pageNum,limit}=this;
      this.axios.get('/api/list',{params:{pageNum,limit}}).then((res)=>{
        this.tableData=res.data.data;
        this.total=res.data.total;
      })
    },
   
    //点击添加弹出遮罩层
    addItem(){
      this.flag=true;
      this.reset();
    },
    //修改
    edit(id){
      this.flag=true;
      let editObj = this.tableData.find(item => item.id === id);
      this.ruleForm.time = editObj.time;
      this.ruleForm.title = editObj.title;
      this.ruleForm.auth = editObj.auth;
      this.ruleForm.isagain = editObj.isagain;
      this.ruleForm.num = editObj.num;
      this.ruleForm.status = editObj.status;
      this.editId = editObj.id;
    },
    //点击确定根据editId判断是修改还是删除
    add(){
      if(this.editId){
        //如果editId有值就修改
        this.axios.post('/api/edit',{...this.ruleForm,id:this.editId}).then((res)=>{
          if(res.data.code===1){
            this.reset();
            this.getData();
          }
        })
      }else{
        //如果editId没有值就添加
        this.axios.post('/api/add',{...this.ruleForm}).then((res)=>{
          if(res.data.code===1){
            this.reset();
            this.getData();
          }
        })
      }
      this.flag=false;
    },
    //清空input框
    reset(){
      this.ruleForm = {
        time:'',
        title:'',
        auth:'',
        isagain:'',
        num:'',
        status:''
      },
      this.editId='';
    },
    //上一页
    prev(){
      if(this.pageNum>=1){
        this.pageNum--;
        this.getData();
      }else{
        return
      }
    },
    //下一页
    next(){
      if(this.pageNum<this.total){
        this.pageNum++;
        this.getData();
      }else{
        return
      }
    },
  },
  created(){
    this.getData();
  }
}
</script>
<style scoped lang="scss">
  .home{
    width:100%;
    height:100%;
  }
  .p{
    width: 100%;
    height: 35px;
    text-align: center;
    button{
        width: 80px;
        height: 30px;
        line-height: 30px;
        border:none;
        background: rgb(233, 78, 6);
        color:white;
        margin-left: 5px;
    }
    span{
        display: inline-block;
        width: 35px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        border:1px solid #ccc;
    }
  }
</style>
