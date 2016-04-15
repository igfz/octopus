// function initAddrDropmenu(){
//   var dropTplStr = ['<div class="addr"><em></em><i></i></div>',
//     '<dl class="dn"><dt>',
//     '<a href="#" class="hprov tab crt"><em>请选择</em><i></i></a>',
//     '<a href="#" class="hcity tab dn"><em>请选择</em><i></i></a>',
//     '<a href="#" class="hblock tab dn"><em>请选择</em><i></i></a>',
//     '<a href="#" class="close" title="关闭"></a><a href="#" class="reset">重置</a></dt>',
//     '<dd class="dib bprov"></dd>',
//     '<dd class="dib bcity dn"></dd>',
//     '<dd class="dib bblock dn"></dd></dl>'].join('');
//   var initTabStr='请选择', delyTime = 50 , overTime = 600; //关闭弹层的延时,鼠标离开超时
//   var hiddenClass = ['icprov','itprov','iccity','itcity','icblock','itblock'];//6个隐藏域的class
//   var warpClass = '.addrselector';  //最外层元素的选择标识

//   var $obj = $(warpClass);
//   $obj.prepend(dropTplStr); //加载地址选择对象的html

//   $obj.each(function(){
//     $(this).find('input:hidden').each(function(i){
//       $(this).addClass(hiddenClass[i]); //给6个隐藏域添加类
//     });
//   });

//   var $dt = $obj.find('dt');
//   var $bdProv = $obj.find('.bprov'),$bdCity = $obj.find('.bcity'),$bdBlock = $obj.find('.bblock');
//   try{
//     $bdProv.html(foreach(postCodeJson['00']));  //加载省份的数据
//   }catch(e){
//     alert('未找到postCodeJson对象,提前加载post-code.json文件');
//   }

//   /*绑定省份点击事件*/
//   $bdProv.on('click','a',function(e){
//     var id = $(this).attr('c'), addrHtml = '', list = postCodeJson[id];
//     var $obj = $(this).closest(warpClass),
//       $addr = $obj.find('.addr'), $dl = $obj.find('dl'),
//       $icProv = $obj.find('.icprov'),$itProv = $obj.find('.itprov'),
//       $other = $obj.find('.iccity , .itcity , .icblock , .itblock'),
//       txt = $(this).text(); //当前的地址

//     addrHtml += foreach(list); //拼接地址元素
//     $addr.find('em').text(txt);  //填充选择的地址
//     $icProv.val(id);  //隐藏域赋值，提交表单用
//     $itProv.val(txt);
//     $other.val(''); //清空其他隐藏域的值
//     $dl.find('.hblock').addClass('dn'); //保证第一次进入不显示地区标签
//     $dl.find('.bcity').html(addrHtml); //填充城市数据
//     console.log(txt);
//     $dl.find('.hprov em').text(txt);  //标签文本改变
//     $dl.find('.hcity em').text(initTabStr).trigger('click');  //触发下个标签点击
//     e.preventDefault();
//   });

//   /*填充地区级*/
//   $bdCity.on('click','a',function(e){
//     var id = $(this).attr('c'), addrHtml = '', list = postCodeJson[id];
//     var $obj = $(this).closest(warpClass),
//       $addr = $obj.find('.addr'), $dl = $obj.find('dl'),
//       $icCity = $obj.find('.iccity'),$itCity = $obj.find('.itcity'),
//       $other = $obj.find('.icblock , .itblock'),
//       txt = $(this).text(); //当前的地址

//     addrHtml += foreach(list); //拼接地址元素
//     $dl.find('.bblock').html(addrHtml);
//     $dl.find('.hcity em').text(txt);
//     $icCity.val(id);  //隐藏域赋值，提交表单用
//     $itCity.val(txt);
//     $other.val(''); //清空其他隐藏域的值
//     var addrTxt = $dl.find('dt em:lt(2)').text();  //获取显示的标签的地址
//     if(addrHtml){ //如果下一个等级有数据
//       $dl.find('.hblock em').text(initTabStr).trigger('click'); //触发下个标签点击
//       $addr.find('em').text(addrTxt);  //填充选择的地址
//     }else{
//       $dl.find('.hblock').addClass('dn');
//       $addr.removeClass('hover').find('em').text(addrTxt);
//       $dl.hide(delyTime); //延时关闭弹层
//     }
//     e.preventDefault();
//   });
//   /*区级点击操作*/
//   $bdBlock.on('click','a',function(e){
//     var id = $(this).attr('c');
//     var $obj = $(this).closest(warpClass),
//       $addr = $obj.find('.addr'), $dl = $obj.find('dl'),
//       $icBlock = $obj.find('.icblock'),$itBlock = $obj.find('.itblock'),
//       txt = $(this).text(); //当前的地址

//     $dl.find('.hblock em').text(txt);
//     $icBlock.val(id);  //隐藏域赋值，提交表单用
//     $itBlock.val(txt);
//     $addr.removeClass('hover').find('em').text($dl.find('dt em').text());
//     $dl.hide(delyTime);
//     e.preventDefault();
//   });
//   /*关闭弹出层*/
//   $obj.on('click','.close',function(e){
//     var $obj = $(this).closest(warpClass),
//       $addr = $obj.find('.addr'), $dl = $obj.find('dl'),
//       $itProv = $obj.find('.itprov'),$itCity = $obj.find('.itcity'),
//       $itBlock = $obj.find('.itblock'),
//       txt = $(this).text(); //当前的地址

//     var addrTxt = $itProv.val()+$itCity.val()+$itBlock.val();
//     $addr.removeClass('hover').find('em').text(addrTxt);
//     $dl.hide(delyTime);
//     e.preventDefault();
//   });
//   /*恢复默认*/
//   $obj.on('click','.reset',function(e){
//     var $obj = $(this).closest(warpClass),
//       $addr = $obj.find('.addr'), $dl = $obj.find('dl'),
//       $allInput = $obj.find('input:hidden'),
//       $allTab = $dl.find('dt .tab'),
//       $fstTab = $allTab.eq(0);

//     $allInput.val('');	//清空所有隐藏域的值
//     $fstTab.trigger('click').find('em').text(initTabStr);//标签定位到第一个
//     $fstTab.siblings('.tab').addClass('dn');	//其他标签隐藏
//     $addr.removeClass('hover').find('em').text(initTabStr);
//     e.preventDefault();
//   });
//   /*获取地区邮编及对应地址*/
//   function foreach(list){
//     var str='';
//     if (list) {
//       for(var obj in list) {
//         for(var key in list[obj]) {
//           str += '<li><a href="#" c="'+key+'">'+list[obj][key]+'</a></li>';}
//       }
//     }return str;
//   }
//   //标签点击事件
//   $dt.on('click','.tab',function(e){
//     var $t = $(this),idx = $t.parent().find('.tab').index(this);
//     var $dd = $t.closest('dl').find('dd');
//     $t.removeClass('dn').addClass('crt').siblings().removeClass('crt');
//     $dd.addClass('dn').eq(idx).removeClass('dn');
//     e.preventDefault();
//   });
//   //下拉框悬停事件
//   $obj.find('.addr').click(function(){
//       $(this).next().trigger('mouseenter');
//   }).mouseleave(function(){
//       $(this).next().trigger('mouseleave');
//   });
//   $obj.find('dl').mouseenter(function(){
//       $(this).prev().addClass('hover');
//       $(this).stop(true).show();  //进入前清空队列
//   }).mouseleave(function(){
//       var $t = $(this);
//       $t.delay(overTime).hide(0,function(){
//         $t.prev().removeClass('hover');
//       });
//   });
// }



// (function($){
//   $.fn.addrDropmenu = function(options){
//     var settings ={
//       initTabStr : '请选择', //标签placeholder
//       delyTime : 50, //关闭弹层的延时
//       overTime : 600 //鼠标离开超时
//     };
//     settings = $.extend({}, settings, options);
//     var _a = settings.initTabStr,_b=settings.delyTime,_c = settings.overTime;
//     var dropTplStr = ['<div class="addr"><em>'+_a+'</em><i></i></div>',
//       '<dl class="dn"><dt>',
//       '<a href="#" class="tab crt"><em>'+_a+'</em><i></i></a>',
//       '<a href="#" class="tab dn"><em>'+_a+'</em><i></i></a>',
//       '<a href="#" class="tab dn"><em>'+_a+'</em><i></i></a>',
//       '<a href="#" class="close" title="关闭"></a><a href="#" class="reset">重置</a></dt>',
//       '<dd class="dib"></dd>',
//       '<dd class="dib dn"></dd>',
//       '<dd class="dib dn"></dd></dl>'].join('');
//     this.addClass('addrselector');  //为css样式加载父类样式
//     this.prepend(dropTplStr); //加载地址选择对象的html
// 		this.find('dd:first').html(foreach(postCodeJson['00']));  //加载省份的数据

//     return this.each(function(){
//     	var $t = $(this), $addr = $t.find('.addr'),$dl = $t.find('dl'),
// 	    	$dt = $t.find('dt'),$tab = $dt.find('.tab'), 
// 	    	$dd = $t.find('dd'), $hide = $t.find('input:hidden'),
// 	    	$tb1 = $tab.eq(0), $tb2 = $tab.eq(1),$tb3 = $tab.eq(2),
// 	      $dd1 = $dd.eq(0), $dd2 = $dd.eq(1),$dd3 = $dd.eq(2),
//         $h11 = $hide.eq(0),$h12 = $hide.eq(1),$h21 = $hide.eq(2),
//         $h22 = $hide.eq(3),$h31 = $hide.eq(4),$h32 = $hide.eq(5),
//         h11v = $h11.val(),h21v = $h21.val(),h31v = $h31.val();
// 		  /*绑定省份点击事件*/
// 		  $dd1.on('click','a',function(e){
// 		    var id = $(this).attr('c'), list = postCodeJson[id],
// 		    	addrHtml = foreach(list),//拼接地址元素
// 		    	txt = $(this).text(); //当前的地址

// 		    $hide.val(''); //清空其他隐藏域的值
// 		    $addr.find('em').text(txt);  //填充选择的地址
// 		    $h11.val(id);  //隐藏域赋值，提交表单用
// 		    $h12.val(txt);
// 		    $tb3.addClass('dn'); //保证第一次进入不显示地区标签
// 		    $dd2.html(addrHtml); //填充城市数据
// 		    $tb1.find('em').text(txt);  //标签文本改变
// 		    $tb2.trigger('click').find('em').text(_a);  //触发下个标签点击
// 		    e.preventDefault();
// 		  });
// 		  /*填充地区级*/
// 		  $dd2.on('click','a',function(e){
// 		    var id = $(this).attr('c'), list = postCodeJson[id],
// 		    	addrHtml = foreach(list);//拼接地址元素
// 		    var $other = $h31.add($h32),txt = $(this).text(); //当前的地址
// 		    $dd3.html(addrHtml);
// 		    $tb2.find('em').text(txt);
// 		    $h21.val(id);  //隐藏域赋值，提交表单用
// 		    $h22.val(txt);
// 		    $other.val(''); //清空其他隐藏域的值
// 		    var addrTxt = $h12.val()+$h22.val();  //获取显示的标签的地址
// 		    if(addrHtml){ //如果下一个等级有数据
// 		      $tb3.trigger('click').find('em').text(_a); //触发下个标签点击
// 		      $addr.find('em').text(addrTxt);  //填充选择的地址
// 		    }else{
// 		      $tb3.addClass('dn');
// 		      $addr.removeClass('hover').find('em').text(addrTxt);
// 		      $dl.hide(_b); //延时关闭弹层
// 		    }
// 		    e.preventDefault();
// 		  });
// 		  /*区级点击操作*/
// 		  $dd3.on('click','a',function(e){
// 		    var id = $(this).attr('c'),txt = $(this).text(); //当前的地址
// 		    $tb3.find('em').text(txt);
// 		    $h31.val(id);  //隐藏域赋值，提交表单用
// 		    $h32.val(txt);
// 		    var addrTxt = $h12.val()+$h22.val()+$h32.val();
// 		    $addr.removeClass('hover').find('em').text(addrTxt);
// 		    $dl.hide(_b);
// 		    e.preventDefault();
// 		  });
//       /*标签点击事件*/
//       $dt.on('click','.tab',function(e){
//         var $t = $(this),idx = $tab.index(this);
//         $t.removeClass('dn').addClass('crt').siblings().removeClass('crt');
//         $dd.addClass('dn').eq(idx).removeClass('dn');
//         e.preventDefault();
//       });
//       /*页面回显地址,获取隐藏域的1,3,5位置的值是code*/
//       h11v && $dd1.find('a[c='+h11v+']').trigger('click');
//       h21v && $dd2.find('a[c='+h21v+']').trigger('click');
//       h31v && $dd3.find('a[c='+h31v+']').trigger('click');

// 		  /*关闭弹出层*/
// 		  $dt.on('click','.close',function(e){
// 		    var txt = $(this).text(); //当前的地址
// 		    var addrTxt = $h12.val()+$h22.val()+$h32.val();
// 		    $addr.removeClass('hover').find('em').text(addrTxt || _a);
// 		    $dl.hide(_b);
// 		    e.preventDefault();
// 		  });
// 		  /*恢复默认*/
// 		  $dt.on('click','.reset',function(e){
// 		    $hide.val('');	//清空所有隐藏域的值
// 		    $tb1.trigger('click').find('em').text(_a);//标签定位到第一个
// 		    $tab.not($tb1).addClass('dn');	//其他标签隐藏
// 		    $addr.find('em').text(_a);
// 		    e.preventDefault();
// 		  });
// 		  //下拉框悬停事件
// 		  $addr.click(function(){
// 	      $dl.trigger('mouseenter');
// 		  }).mouseleave(function(){
// 	      $dl.trigger('mouseleave');
// 		  });
// 		  $dl.mouseenter(function(){
// 	      $addr.addClass('hover');
// 	      $dl.stop(true).show();  //进入前清空队列
// 		  }).mouseleave(function(){
// 	      $dl.delay(_c).hide(0,function(){
// 	        $addr.removeClass('hover');
// 	      });
// 		  });
//     });
// 		/*获取地区邮编及对应地址*/
// 	  function foreach(list){
// 	    var str='';
// 	    if (list) {
// 	      for(var obj in list) {
// 	        for(var key in list[obj]) {
// 	          str += '<li><a href="#" c="'+key+'">'+list[obj][key]+'</a></li>';}
// 	      }
// 	    }return str;
// 	  }
//   }
// })(jQuery);


(function(a){a.fn.addrDropmenu=function(c){var b={initTabStr:"请选择",delyTime:50,overTime:600};b=a.extend({},b,c);var f=b.initTabStr,g=b.delyTime,h=b.overTime;var d=['<div class="addr"><em>'+f+"</em><i></i></div>",'<dl class="dn"><dt>','<a href="#" class="tab crt"><em>'+f+"</em><i></i></a>",'<a href="#" class="tab dn"><em>'+f+"</em><i></i></a>",'<a href="#" class="tab dn"><em>'+f+"</em><i></i></a>",'<a href="#" class="close" title="关闭"></a><a href="#" class="reset">重置</a></dt>','<dd class="dib"></dd>','<dd class="dib dn"></dd>','<dd class="dib dn"></dd></dl>'].join("");this.addClass("addrselector");this.prepend(d);this.find("dd:first").html(e(postCodeJson["00"]));return this.each(function(){var A=a(this),q=A.find(".addr"),m=A.find("dl"),y=A.find("dt"),p=y.find(".tab"),t=A.find("dd"),s=A.find("input:hidden"),C=p.eq(0),o=p.eq(1),D=p.eq(2),n=t.eq(0),l=t.eq(1),w=t.eq(2),v=s.eq(0),x=s.eq(1),k=s.eq(2),r=s.eq(3),B=s.eq(4),i=s.eq(5),u=v.val(),z=k.val(),j=B.val();n.on("click","a",function(I){var F=a(this).attr("c"),H=postCodeJson[F],G=e(H),E=a(this).text();s.val("");q.find("em").text(E);v.val(F);x.val(E);D.addClass("dn");l.html(G);C.find("em").text(E);o.trigger("click").find("em").text(f);I.preventDefault()});l.on("click","a",function(J){var G=a(this).attr("c"),F=postCodeJson[G],H=e(F);var E=B.add(i),K=a(this).text();w.html(H);o.find("em").text(K);k.val(G);r.val(K);E.val("");var I=x.val()+r.val();if(H){D.trigger("click").find("em").text(f);q.find("em").text(I)}else{D.addClass("dn");q.removeClass("hover").find("em").text(I);m.hide(g)}J.preventDefault()});w.on("click","a",function(H){var F=a(this).attr("c"),G=a(this).text();D.find("em").text(G);B.val(F);i.val(G);var E=x.val()+r.val()+i.val();q.removeClass("hover").find("em").text(E);m.hide(g);H.preventDefault()});y.on("click",".tab",function(G){var F=a(this),E=p.index(this);F.removeClass("dn").addClass("crt").siblings().removeClass("crt");t.addClass("dn").eq(E).removeClass("dn");G.preventDefault()});u&&n.find("a[c="+u+"]").trigger("click");z&&l.find("a[c="+z+"]").trigger("click");j&&w.find("a[c="+j+"]").trigger("click");y.on("click",".close",function(G){var F=a(this).text();var E=x.val()+r.val()+i.val();q.removeClass("hover").find("em").text(E||f);m.hide(g);G.preventDefault()});y.on("click",".reset",function(E){s.val("");C.trigger("click").find("em").text(f);p.not(C).addClass("dn");q.find("em").text(f);E.preventDefault()});q.click(function(){m.trigger("mouseenter")}).mouseleave(function(){m.trigger("mouseleave")});m.mouseenter(function(){q.addClass("hover");m.stop(true).show()}).mouseleave(function(){m.delay(h).hide(0,function(){q.removeClass("hover")})})});function e(i){var j="";if(i){for(var k in i){for(var l in i[k]){j+='<li><a href="#" c="'+l+'">'+i[k][l]+"</a></li>"}}}return j}}})(jQuery);
$('.addrselector2').addrDropmenu();

function getDate(){
  var d,s,t;
  d=new Date();
  s=d.getFullYear().toString()+'-';
  t=d.getMonth()+1;
  s+=(t>9?'':'0')+t+'-';
  t=d.getDate();
  s+=(t>9?'':'0')+t+' ';
  t=d.getHours();
  s+=(t>9?'':'0')+t+':';
  t=d.getMinutes();
  s+=(t>9?'':'0')+t+':';
  t=d.getSeconds();
  s+=(t>9?'':'0')+t;
  return s;
}
//console.log(getDate())

function getPageNumbers(currentPageNumber, lastPageNumber, count) {
    var pageStr = '<div class="pager">';
    var avg = parseInt(count / 2);
    var startPageNumber = currentPageNumber - avg;
    if (startPageNumber <= 0) {startPageNumber = 1;}
    var endPageNumber = startPageNumber + count - 1;
    if (endPageNumber > lastPageNumber) { endPageNumber = lastPageNumber;}
    if (lastPageNumber - startPageNumber < count-1) {
      startPageNumber = endPageNumber - count+1;
      if (startPageNumber <= 0) {startPageNumber = 1;}
    }
    if (currentPageNumber > 1) {
      pageStr += '<a href="#" p="1">首页</a><a href="#" p="'+(currentPageNumber-1)+'">上一页</a>';
    }
    for (var i = startPageNumber; i <= endPageNumber; i++) {
      if (currentPageNumber != i) {
        pageStr += '<a href="#" p="'+i+'">'+i+'</a>';
      }else{
        pageStr += '<span>'+i+'</span>';
      }
    }
    if (currentPageNumber != lastPageNumber) {
      pageStr += '<a href="#" p="'+(currentPageNumber+1)+'">下一页</a><a href="#" p="'+lastPageNumber+'">尾页</a>';
    }
     pageStr += '</div>';
    return pageStr;
  }
function getPageNumbers(d,h,g){var c='<div class="pager">';var f=parseInt(g/2);var e=d-f;if(e<=0){e=1}var a=e+g-1;if(a>h){a=h}if(h-e<g-1){e=a-g+1;if(e<=0){e=1}}if(d>1){c+='<a href="#" p="1">首页</a><a href="#" p="'+(d-1)+'">上一页</a>'}for(var b=e;b<=a;b++){if(d!=b){c+='<a href="#" p="'+b+'">'+b+"</a>"}else{c+="<span>"+b+"</span>"}}if(d!=h){c+='<a href="#" p="'+(d+1)+'">下一页</a><a href="#" p="'+h+'">尾页</a>'}c+="</div>";return c}

//for (var i = 1; i <= 10; i++) {
  console.log(getAutoCenterPageNumbers(7,10,10));
//};
  