let router = require('koa-router')();

router.get('/newslist', async(ctx) => {
  await ctx.render('newslist');
});

router.get('/newscate', async(ctx) => {
  await ctx.render('newscate');
});

module.exports = router.routes();