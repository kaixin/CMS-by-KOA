let router = require('koa-router')();

router.get('/add', async(ctx) => {
  await ctx.render('admin/user/add');
});

router.get('/edit', async(ctx) => {
  await ctx.render('admin/user/edit');
});

router.get('/delete', async(ctx) => {
  await ctx.render('admin/user/delete');
});

module.exports = router.routes();