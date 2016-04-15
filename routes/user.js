
var user = {

  sessionUser :'',

  showAuthCompany : function(req, res){
    
    res.render('./user/auth-company', {title:"首页"});
  },
  authCompany : function(req, res){
    
    res.json({'code':1,'msg':'注册成功'});
  },
  showAuthPerson : function(req, res){
    
    res.render('./user/auth-person', {title:"首页"});
  },
  authPerson : function(req, res){
    
    res.json({'code':1,'msg':'注册成功'});
  }
};


module.exports = user;
