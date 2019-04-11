var Koa = require('koa');
var router = require('koa-router')();
const render = require('koa-art-template');
const path = require('path');
var static = require('koa-static');
var bodyParser = require('koa-bodyparser');
var admin = require('./routes/admin.js');
var api = require('./routes/api.js');

var DB = require('./module/db.js');

var app = new Koa();

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV != 'production'
});

app.use(static('./static')); 

app.use(bodyParser());

router.get('/', async (ctx) => {
  let list = await DB.find('user', {});
  await ctx.render('index', {
    list
  });
});

//添加用户
router.get('/add', async (ctx) => {
  await ctx.render('add');
});

router.post('/doAdd', async (ctx) => {
  console.log(ctx.request.body);
  let result = await DB.insert('user', ctx.request.body);
  if(result) {
    ctx.redirect("/");
  }else{
    console.log(result);
    ctx.redirect("/");
  }
});

//编辑用户
router.get('/edit', async (ctx) => {
  let id = ctx.query.id;
  let result = await DB.find('user', {_id: DB.getObjectId(id)});
  console.log(result);
  console.log("***");
  await ctx.render('edit', {
    list: result[0]
  });
});

router.post('/doEdit', async (ctx) => {
  let id = ctx.request.body.id;
  console.log(id);
  let test = await DB.find('user', {_id: DB.getObjectId(id)});
  console.log(test);
  let result = await DB.update('user', {_id: DB.getObjectId(id)}, {
    username: ctx.request.body.username,
    age: ctx.request.body.age,
    sex: ctx.request.body.sex
  });

  if(result) {
    ctx.redirect("/");
  }else{
    ctx.redirect("/edit?id=" + id);
  }
});

//删除用户
router.get('/remove', async (ctx) => {
  let id = ctx.query.id;
  let result = DB.remove('user', {_id: DB.getObjectId(id)});
  ctx.redirect("/");
});

router.use('/admin', admin);
router.use('/api', api);

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8000);