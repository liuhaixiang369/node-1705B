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
  async del(id) {
    await this.app.mysql.delete('userlist',{id});
  }
  //修改
  async update(row) {
    await this.app.mysql.update('userlist', row);
  }
}
module.exports=UserService;