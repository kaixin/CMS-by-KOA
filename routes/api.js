let router = require('koa-router')();

router.get('/newslist', async(ctx) => {
  ctx.body = '这是/api/newslist页面';
});

router.get('/newscate', async(ctx) => {
  ctx.body = '这是/api/newscate页面';
});

module.exports = router.routes();