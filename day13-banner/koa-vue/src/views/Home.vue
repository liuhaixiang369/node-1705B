<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3">消息中心</el-menu-item>
          <el-menu-item index="4"><a target="_blank">订单管理</a></el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-col :span="12">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
          <el-button @click="addItem">创建新banner</el-button>
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
              prop="title"
              label="备注"
              width="120">
            </el-table-column>
            <el-table-column
              prop="auth"
              label="类型"
              width="120">
            </el-table-column>
            <el-table-column
              prop="isagain"
              label="排序"
              width="120">
            </el-table-column>
            <el-table-column
              prop="time"
              label="创建时间"
              width="150">
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
              <el-form-item label="备注" prop="title">
                <el-input type="text" v-model="ruleForm.title" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="类型" prop="auth">
                <el-input type="text" v-model="ruleForm.auth" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="排序" prop="isagain">
                <el-input type="text" v-model="ruleForm.isagain" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="add">{{editId?'修改':'添加'}}</el-button>
            </span>
          </el-dialog>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[3, 6, 9, 12]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data(){
    return {
      tableData: [],
      pageNum:1,
      limit:3,
      flag: false,
      ruleForm:{
        title:'',
        auth:'',
        isagain:'',
      },
      editId:'',
      total:0
    }
  },
  methods:{
    //控制每页显示的条数
    handleSizeChange(val) {
      this.limit=val;
      this.getData();
    },
    //当前显示第几页
    handleCurrentChange(val) {
      this.pageNum=val;
      this.getData();
    },
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
        //添加
        this.axios.post('/api/add',{...this.ruleForm}).then((res)=>{
          console.log(res)
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
  .el-container{
    width:100%;
    height:100%;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: right;
  }
  .el-col{
    width:100%;
    height:100%;
  }
  .el-menu{
    width:100%;
    height:100%;
  }
  .el-header{
    width:100%;
    padding:0;
  }
</style>
