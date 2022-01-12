/*
 * @Author: ArdenZhao
 * @Date: 2022-01-12 18:02:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-01-12 18:02:25
 * @FilePath: /koa2/hi.js
 */
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);