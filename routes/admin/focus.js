let router = require('koa-router')();

router.get('/add', async(ctx) => {
  await ctx.render('admin/focus/add');
});

router.get('/edit', async(ctx) => {
  await ctx.render('admin/focus/edit');
});

router.get('/delete', async(ctx) => {
  await ctx.render('admin/focus/delete');
});

module.exports = router.routes();