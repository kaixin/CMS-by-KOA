var router = require('koa-router')();

router.get('/', async(ctx) => {
  ctx.body = '这是/admin页面';
});

router.get('/user', async(ctx) => {
  ctx.body = '这是/admin/user页面'
});

router.get('/focus', async(ctx) => {
  ctx.body = '这是/admin/focus页面';
});

module.exports = router.routes();