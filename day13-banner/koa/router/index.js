const router = require('koa-router')();

router.post('/api/add', async (ctx) => {
    let {
        title,
        auth,
        isagain
    } = ctx.request.body;
    let sql = 'insert into examA (title,auth,isagain) values (?,?,?)';
    if (!title || !auth || !isagain) {
        return ctx.body = {
            code: 0,
            msg: '参数不全'
        }
    }

    let isData = await ctx.mysql.query('select * from examA where title=?', [title]);

    if (isData.data.length) {
        return ctx.body = {
            code: 0,
            msg: '此人已经存在'
        }
    } else {
        let data = await ctx.mysql.query(sql, [title, auth, isagain]);
        if (data.msg == 'success') {
            ctx.body = {
                code: 1,
                msg: '添加成功'
            }
        } else {
            ctx.body = {
                code: 0,
                msg: '添加失败'
            }
        }
    }
})

router.post('/api/edit', async (ctx) => {
    let {
        time,
        title,
        auth,
        isagain,
        num,
        status,
        id
    } = ctx.request.body;
    const sql = `update examA set title=?,auth=?,isagain=?,num=?,status=? where id=?`
    let res = await ctx.mysql.query(sql, [title, auth, isagain, num, status, id]);
    if (res.msg == 'success') {
        ctx.body = {
            code: 1,
            msg: '修改成功'
        }
    } else {
        ctx.body = {
            code: 1,
            msg: '修改失败'
        }
    }
})

router.get('/api/delete', async (ctx) => {
    let {
        id
    } = ctx.query;
    let sql = 'delete from examA where id=?';
    let res = await ctx.mysql.query(sql, [id]);
    if (res.msg === 'error') {
        ctx.body = {
            code: 0,
            msg: '删除失败'
        }
    } else {
        ctx.body = {
            code: 1,
            msg: '删除成功'
        }
    }
})

router.get('/api/list', async (ctx) => {
    let {
        pageNum,
        limit
    } = ctx.query;
    let startIndex = (pageNum - 1) * limit;
    let data = await ctx.mysql.query(`select * from examA limit ${startIndex},${limit}`);

    let count = await ctx.mysql.query('select count(*) from examA');

    let total =count.data[0]['count(*)'];
    if (data.data.length) {
        ctx.body = {
            code: 1,
            data: data.data,
            total
        }
    } else {
        ctx.body = {
            code: 0,
            msg: '暂无数据',
        }
    }
})

module.exports = router;