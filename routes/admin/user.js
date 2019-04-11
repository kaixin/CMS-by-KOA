let router = require('koa-router')();

router.get('/add', async(ctx) => {
  ctx.body = '这是/admin/user/add页面'
});

router.get('/edit', async(ctx) => {
  ctx.body = '这是/admin/user/edit页面'
});

router.get('/delete', async(ctx) => {
  ctx.body = '这是/admin/user/delete页面'
});

module.exports = router.routes();