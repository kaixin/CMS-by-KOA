let router = require('koa-router')();

router.get('/add', async(ctx) => {
  ctx.body = '这是/admin/focus/add页面'
});

router.get('/edit', async(ctx) => {
  ctx.body = '这是/admin/focus/edit页面'
});

router.get('/delete', async(ctx) => {
  ctx.body = '这是/admin/focus/delete页面'
});

module.exports = router.routes();