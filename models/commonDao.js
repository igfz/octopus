/**
 * 所有Dao的父类
 * model: 实体对象
 * query: 查询条件
 * fileds: 要获取的字段
 * options: 查询选项 ，有 limit, skip, populate 等等
 *					更新选项，有 safe 和 multi 等
 * callback: 回调
 * error: 错误
 */
 
function CommonDao (Model){
  if(typeof Model === 'undefined' || Model == null)
    throw new Error('CommonDao.js : Model can not be null.');
  this.model = Model;
}

 /**
 *create
 *主要用于批量添加
 */
CommonDao.prototype.create = function (model, callback){
	var _model = this.model;
	var entity = new _model();
	for(var k in model) {entity[k] = model[k];}	//每个键都赋值
	_model.create(entity,function(error){
		if(error) console.error('user create error' + error);
		callback(error);
	});
};

/**
 * 根据Id获取Model
 */
CommonDao.prototype.getById = function (id, callback) {
  this.model.findById(id , function(error, model){
    if(error) console.error('get user by id error' + error);
		callback(error, model);
  });
};

/**
 * 根据查询条件获取Model
 */
CommonDao.prototype.getByQuery = function (query, fileds, options, callback) {
	if ('function' == typeof query) {
    callback = query;
    query = {};
    fields = null;
    options = null;
  } else if ('function' == typeof fields) {
    callback = fields;
    fields = null;
    options = null;
  } else if ('function' == typeof options) {
    callback = options;
    options = null;
  }
  this.model.find(query, fileds, options, function(error, models){
    if(error) console.error('user find error'+error);
		callback(error, models);
  });
};

/**
 * 根据查询条件获取Model
 */
CommonDao.prototype.countByQuery = function (query, callback) {
  this.model.count(query, function(error, model){
    if(error) return console.error('get count error' + error);
		callback(error, model);
  });
};

/**
 * 根据查询条件删除
 */
CommonDao.prototype.delete = function (query, callback){
  this.model.remove(query, function(error){
    if(error) console.error('user delete error' + error);
		callback(error);
  });
};

/*
 * 更新
 */
CommonDao.prototype.update = function(query, model ,options, callback) {
	if ('function' == typeof options) {
    callback = options;
    options = null;
  }
  this.model.update(query, model, options, function (error) {
    if(error) console.error('user update error' + error);
    callback(error);
  });
};
 
module.exports = CommonDao;