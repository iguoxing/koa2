/*
 * @Author: ArdenZhao
 * @Date: 2022-01-12 18:14:54
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-01-12 18:37:49
 * @FilePath: /koa2/index.js
 */
const Koa = require("koa");
const koaStatic = require("koa-static");
const koaRouter = require("koa-router")();
const koaBodyParser = require("koa-bodyparser");
const path = require("path");
const mysql = require("./mysql.js");

const app = new Koa();

// let datas = [
//     { id: 1, content: "koa", finish: false },
//     { id: 2, content: "ts", finish: false },
//     { id: 3, content: "vue", finish: true }
// ];
// let maxId = 3;

app.use(koaStatic(path.resolve(__dirname, './views'), {
    gzip: true,
    maxAge: 20
}))

app.use(koaBodyParser())

koaRouter.get("/getTodos", async (ctx) => {
    const datas = await mysql(`select * from user;`)
    ctx.body = {
        code: 0,
        data: datas,
        msg: ''
    }
})

koaRouter.post("/addTodo", async (ctx) => {
    let content = ctx.request.body.content
    console.log(ctx.request.body)
    if (!content) {
        ctx.body = {
            code: 1,
            data: null,
            msg: '新增内容为空~'
        }
    } else {
        await mysql(`insert into user (content, c_time) values (?, ?)`, [`${content}`, new Date()])
        ctx.body = {
            code: 0,
            data: null,
            msg: '新增成功'
        }
    }
})

koaRouter.post("/changeState", async (ctx) => {
    const { id, finish } = ctx.request.body
    if (!id) {
        ctx.body = {
            code: 1,
            data: null,
            msg: '参数ID错误'
        }
    } else {
        const updateRes = await mysql(`update user set finish=? where id=?`, [finish ? 0 : 1, id])
        console.log(updateRes)
        ctx.body = {
            code: 0,
            data: null,
            msg: '修改成功'
        }
    }
})

koaRouter.post("/deleteTodo", async (ctx) => {
    let id = ctx.request.body.id;
    if (!id) {
        ctx.body = {
            code: 1,
            data: null,
            msg: '参数ID错误'
        }
    } else {
        await mysql(`delete from user where id=?`, [id])
        ctx.body = {
            code: 0,
            data: null,
            msg: '删除成功'
        }
    }
})

/*启动路由*/
app.use(koaRouter.routes());
app.use(koaRouter.allowedMethods());

app.listen(5555, () => {
    console.log('服务正在端口5555运行>>>')
});