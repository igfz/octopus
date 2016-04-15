
var index = {

  sessionUser :'',

  index : function(req, res){
    res.render('index', {title:"首页"});
  },
  resume : function(req, res){
    res.render('resume');
  },
  showLogin : function(req, res){
    res.locals.user = req.session.user;
    res.locals.error = req.session.error || '';
    delete req.session.error; //清除错误提示
    res.render('login', { title: '登陆'});
  },
  login : function(req, res){
    var username = req.body.username;
    if (username!='gong') {
      return res.json({code:0,msg:'注册失败，用户不是gong'});
    }
    res.locals.user = req.session.user = username; //存入session
    res.json({code:1,msg:'注册成功'});
  },
  logout : function(req, res){
    req.session.destroy();
    res.redirect("/");
  },
  showRegister : function(req, res){
    res.locals.error = req.session.error || '';
    delete req.session.error; //清除错误提示
    res.render('register', { title: '注册'});
  },
  register : function(req, res){
    var username = req.body.username;
    if (username!='gong') {
      return res.json({code:0,msg:'注册失败，用户不是gong'});
    }
    res.locals.user = req.session.user = username; //存入session
    res.json({code:1,msg:'注册成功'});
  },
  ajaxPost : function(req, res){
    var bd = req.body;
    res.set({'Content-Type':'application/json','Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Methods':'POST,PUT,DELETE','Access-Control-Allow-Headers':'X-Requested-With,Content-Type'
             });
    res.json({'code':1,'msg':'注册成功','req':bd});
  }
};


module.exports = index;
