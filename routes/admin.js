var router = require('koa-router')();

let user = require('./admin/user.js');
let focus = require('./admin/focus.js');

router.get('/', async(ctx) => {
  ctx.body = '这是/admin页面';
});

router.use('/user', user);
router.use('/focus', focus);

module.exports = router.routes();