import React, {
    Component
} from 'react';
import {
    Table,Divider,Pagination, Button,Modal,Input,DatePicker, Form, Select, Cascader, InputNumber
} from 'antd';
import axios from 'axios';
import './css/home.css';
const { Option } = Select;

export default class home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns:[{
                    title: '日期',
                    dataIndex: 'time',
                    render: text => <a> {text} </a>,
                },
                {
                    title: '标题',
                    dataIndex: 'title',
                },
                {
                    title: '作者',
                    dataIndex: 'auth',
                },
                {
                    title: '重要性',
                    dataIndex: 'isagain',
                },
                {
                    title: '阅读数',
                    dataIndex: 'num',
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                },
                {
                    title: '操作',
                    render: (text, record) => ( 
                        <span>
                            <a onClick={this.edit.bind(this,text.id)}> 修改 </a> 
                            <Divider type="vertical"/>
                            <a onClick={this.del.bind(this,text.id)}> 删除 </a> 
                        </span>
                    ),
                },
            ],
            data:[],
            pageNum:1,
            limit:5,
            flag:false,
            title:'',
            auth:'',
            isagain:'',
            num:'',
            status:'',
            etid:'',
            total:0
        }
    }
    getData() {
        let {pageNum,limit}=this.state;
        axios.get('/api/list',{params:{pageNum,limit}}).then(res=>{
            if(res.data.code===1){
                this.setState({
                    data:res.data.data,
                    total:res.data.total
                })
            }
        })
    }
    //修改
    edit(id){
        this.setState({flag:true});
        let dataAll=this.state.data.find(item=>item.id===id);
        this.setState({
            title:dataAll.title,
            auth:dataAll.auth,
            isagain:dataAll.isagain,
            num:dataAll.num,
            status:dataAll.status,
            etid:dataAll.id
        })
    }
    //删除
    del(id){
        axios.get('/api/delete',{params:{id}}).then(res=>{
            if(res.data.code===1){
                this.getData();
            }
        })
    }
    //获取初始数据
    componentDidMount() {
        this.getData();
    }
    //点击弹框
    add(){
        this.initData();
        this.setState({
            flag:true
        })
    } 
    //判断是添加还是修改
    addItem(){
        let {title,auth,isagain,num,status,etid}=this.state;
        if(etid){
            //修改
            let id=etid;
            axios.post('/api/edit',{title,auth,isagain,num,status,id}).then((res)=>{
                if(res.data.code===1){
                    this.getData();
                    this.setState({
                        flag:false
                    })
                }
            })
        }else{
            //添加
            axios.post('/api/add',{title,auth,isagain,num,status}).then((res)=>{
                if(res.data.code===1){
                    this.getData();
                    this.setState({
                        flag:false
                    })
                }
            })
        }
        this.initData();
    }
    hideModal(){
        this.setState({
            flag:false
        })
    }
    //初始化数据
    initData(){
        this.setState({
            title:'',
            auth:'',
            isagain:'',
            num:'',
            status:'',
            etid:''
        })
    }
    //数据双向绑定
    Change(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onChange = page => {
        this.setState({
          pageNum: page,
        });
        this.getData();
    }
    render() {
        let {title,auth,isagain,num,status,total}=this.state;
        return ( 
            <div className = "home" >
                <Button type="primary" onClick={this.add.bind(this)}>添加</Button>
                <Table columns = {this.state.columns} pagination={false} rowKey="id" dataSource = {this.state.data}/> 
                <Pagination defaultPageSize={5} current={this.state.pageNum} onChange={this.onChange} total={20} />
                <Modal
                    visible={this.state.flag}
                    onOk={this.addItem.bind(this)}
                    onCancel={this.hideModal.bind(this)}
                    okText="确认"
                    cancelText="取消"
                    >
                    <p>标题:<Input value={title} name="title" onChange={this.Change.bind(this)}/></p>
                    <p>日期:<DatePicker/></p>
                    <p>作者:<Input value={auth} name="auth" onChange={this.Change.bind(this)}/></p>
                    <p>重要性:<Input value={isagain} name="isagain" onChange={this.Change.bind(this)}/></p>
                    <p>阅读数:<Input value={num} name="num" onChange={this.Change.bind(this)}/></p>
                    <p>状态:<Input value={status} name="status" onChange={this.Change.bind(this)}/></p>
                </Modal>
            </div>
        )
    }
}