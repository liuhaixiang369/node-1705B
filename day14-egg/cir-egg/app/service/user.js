const {Service}=require('egg');

class UserService extends Service {
  //注册
  async registry(username) {
    const user = await this.app.mysql.get('userlist', {username});
    return user
  }
  //登录
  async login(username,password) {
    const user = await this.app.mysql.get('userlist', {username,password});
    return user
  }
  //添加用户
  async addUser(username,password,age) {
    await this.app.mysql.insert('userlist', {username,password,age});
  }
  //删除
  async del(username) {
    await this.app.mysql.delete('userlist',{username});
  }
  //修改
  async update(username,password) {
    await this.app.mysql.query('update userlist set password=? where username=?',[username,password]);
  }
  //查找首页
  async list() {
    const data=await this.app.mysql.select('home_list');
    return data;
  }
  //查找用户
  async user(username) {
    const $sql=`select age,head,name from home_list,userlist where userlist.username='${username}' and userlist.username=home_list.name`;
    const data=await this.app.mysql.query($sql);
    return data
  }
  //查找用户头像
  async head(name) {
    const $sql=`select head from home_list where name='${name}'`;
    const data=await this.app.mysql.query($sql);
    return data
  }
  //添加说说
  async add(row) {
    await this.app.mysql.insert('home_list', row);
  }
}
module.exports=UserService;