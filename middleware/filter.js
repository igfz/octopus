
var filter = {
  session : function (req, res,next) {
    res.locals.user = req.session.user || '';
    res.locals.title = 'nodejs天堂';
    next();
  },
  auth : function (req, res,next){
    if (!req.session.user) {
      req.session.error = '请先登录'; //其他页面进来要提示
      return res.redirect('/login');
    }
    next();
  }
};

module.exports = filter;
