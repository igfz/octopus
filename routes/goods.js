
var site = {

  sessionUser :'',

  add : function(req, res){
    res.locals.user = req.session.user || '';
    res.render('index', {title:'添加商品'});
  }

};


module.exports = site;
