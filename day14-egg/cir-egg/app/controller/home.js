'use strict';

const Controller = require('egg').Controller;
const jwt=require('jsonwebtoken');;

class HomeController extends Controller {
  async registry() {
    const {ctx} = this;
    let {username,password,age} = ctx.request.body;
    let user=await ctx.service.user.registry(username);
    if(user){
      ctx.body={
        code:0,
        msg:'此人已存在'
      }
    }else{
      await ctx.service.user.addUser(username,password,age);
      ctx.body = {
        code: 1,
        msg: '注册成功'
      }
    }
  }

  async login() {
    const {ctx} = this;
    let {username,password} = ctx.request.body;
    let user=await ctx.service.user.login(username, password);
    if(user){
      let token = jwt.sign({...user},'liuhx', {expiresIn:60});
      ctx.cookies.set(token)
      ctx.body = {
        code: 1,
        msg: '登录成功'
      }
    }else{
      ctx.body={
        code:0,
        msg:'此人不存在'
      }
    }
  }
  async del() {
    const {ctx} = this;
    let {username} = ctx.query;
    await ctx.service.user.del(username);
    ctx.body = {
      code: 1,
      msg: '删除成功'
    }
  }

  async update() {
    const {ctx} = this;
    let {username,password,pwd} = ctx.request.body;
    await ctx.service.user.update(username,password);
    ctx.body = {
      code: 1,
      msg: '修改成功'
    }
  }

  async list() {
    const {ctx} = this;
    let data=await ctx.service.user.list();
    ctx.body = {
      code: 1,
      data
    }
  }

  async user() {
    const {ctx} = this;
    let {username}=ctx.request.body;
    console.log(username)
    let data=await ctx.service.user.user(username);
    ctx.body = {
      code: 1,
      data
    }
  }

  async head() {
    const {ctx} = this;
    let {name}=ctx.query;
    let data=await ctx.service.user.head(name);
    ctx.body = {
      code: 1,
      data
    }
  }

  async add() {
    const {ctx} = this;
    let {img,txt,name,time,head,like}=ctx.request.body;
    await ctx.service.user.add({img,txt,name,time,head,like});
    ctx.body={
      code:1,
      msg:'添加成功'
    }
  }
}

module.exports = HomeController;
