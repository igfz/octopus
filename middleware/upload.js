var multer  = require('multer');
var fs = require('fs');

var uploads = {

  sessionUser :'',

  loadMulter : multer({
    dest: './uploads/',
    rename: function (fieldname, filename) {
      return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
    }
  }),
  ajaxUpload : function(req, res){
    res.set({'Content-Type':'text/plain'});
    res.send(req.files);
  },
  delUploadFile : function (req, res) {
    var id = req.params.id ;
    var path = 'uploads/'+id;
    
    fs.exists(path , function (exists) {
      if (exists) {
        fs.unlink('uploads/'+id, function (err) {
          if (err) throw err;
          return res.json({'code':1,'msg':'成功删除'+id});
        });
      }else{
        res.json({'code':0,'msg':'删除失败，文件不存在'});
      }
    });
  }
};

module.exports = uploads;