var express = require('express');
var router = express.Router();
var index = require('./routes/index');
var manager = require('./routes/manager');
var user = require('./routes/user');
var filter = require('./middleware/filter');
var upload = require('./middleware/upload');
var multer  = require('multer');

router.get('/',filter.session, index.index);
router.get('/resume', index.resume);
router.get('/login',filter.session, index.showLogin);
router.post('/login',index.login);
router.get('/logout',index.logout);
router.get('/register',filter.session, index.showRegister);
router.post('/register',index.register);

router.use(filter.auth);//拦截器，以下页面进入需要登陆

router.get('/manager/add-goods',filter.session, manager.showAddGoods);
router.post('/manager/add-goods', manager.addGoods);
router.get('/manager/add-cate',filter.session, manager.showAddCate);
router.post('/manager/add-cate',manager.addCate);

router.get('/manager/goods',filter.session, manager.showGoods);
router.get('/manager/category',filter.session, manager.showCategory);

router.get('/user/auth-company',filter.session, user.showAuthCompany);
router.post('/user/auth-company',user.authCompany);
router.get('/user/auth-person',filter.session, user.showAuthPerson);
router.post('/user/auth-person',user.authPerson);

router.post('/upload/pic',upload.loadMulter, upload.ajaxUpload);
router.delete('/upload/delete/:id', upload.delUploadFile);

module.exports = router;
