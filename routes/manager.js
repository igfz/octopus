
var manager = {

  sessionUser :'',

  showAddGoods : function(req, res){
    res.render('./manager/add-goods', {title:'添加商品'});
  },
  addGoods : function(req, res){
    res.json({'code':1,'msg':'注册成功'});
  },
  showAddCate : function(req, res){
    res.render('./manager/add-cate', {title:'添加分类'});
  },
  addCate : function(req, res){
    res.json({'code':1,'msg':'注册成功'});
  },
  showGoods : function(req, res){
    res.render('./manager/goods', {title:'商品管理'});
  },
  showCategory : function(req, res){
    res.render('./manager/category', {title:'类别管理'});
  }
};


module.exports = manager;
