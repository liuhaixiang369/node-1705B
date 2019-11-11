#! /usr/bin/env node

const os=require('os');

//获取内核信息
let cpus=os.cpus();
console.log('cpu内核',cpus);

//获取操作平台
let platforms=os.platform();
console.log('操作平台',platforms)

//获取平台类型
let type=os.type();
console.log('平台类型',type)

//获取用户信息
let user=os.userInfo();
console.log('用户信息',user)

//获取cpu架构
let arch=os.arch();
console.log('cpu架构',arch)

//获取主机名
let name=os.hostname();
console.log('主机名',name)

//获取内存
let total=os.totalmem();
console.log('系统内存',total)

//引入模块
var blessed = require('blessed')
, contrib = require('blessed-contrib')
, screen = blessed.screen()
, bar = contrib.bar(
    { label: 'Server Utilization (%)'
    , barWidth: 4
    , barSpacing: 6
    , xOffset: 0
    , maxHeight: 9})
 screen.append(bar) 
 bar.setData(
    { titles: ['cpu1', 'cpu2','cpu3','cpu4']
    , data: [5, 10,2,8]})

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
return process.exit(0);
});

screen.render()

