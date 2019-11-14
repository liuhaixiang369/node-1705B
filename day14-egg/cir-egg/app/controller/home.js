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
    console.log(username,password)
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
    let {id} = ctx.query;
    await ctx.service.user.del(id);
    ctx.body = {
      code: 1,
      msg: '删除成功'
    }
  }

  async update() {
    const {ctx} = this;
    let {username,password,age,id} = ctx.query
    await ctx.service.user.update({username,password,age,id});
    ctx.body = {
      code: 1,
      msg: '修改成功'
    }
  }
}

module.exports = HomeController;
