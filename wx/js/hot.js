(function($) {
	//参数声明
	var $tabs = $('.tabs'),$tbd=$('.tab-bd'),$more=$('.more'),
		$item = $tbd.find('.tab-item'),tplMain=$('#tplMain').html();

	//ajax 参数
	var indexParam = JSON.parse(JSON.stringify(ajaxParam));
	indexParam.busiCode ='550007';
	indexParam.commandInfo = {'pageNo':'1','pageSize':'10','type':'0'};
	//标签切换功能实现
	!function(){
		$tabs.on('touchend','span',function(e){
			var $t = $(this),i = $t.index();
			$tabs.add($tbd).find('.crt').removeClass('crt');
			$item.eq(i).add($t).addClass('crt');
			tabsCallBack($t);
			e.preventDefault();
		});
		var tid = SS['tabid'] || 0;
		$tabs.find('span').eq(tid).trigger('touchend');	//第一次加载触发
	}();

	//标签切换ajax
	function tabsCallBack($t){
		var tp = $t.data('id')+'',itemStr = SS['item'+tp];
		var $citem = $item.eq(tp);
		indexParam.commandInfo.type = tp;
		SS['tabid'] = tp;
		window.scrollTo(0,0);	//每次点击都回到顶部
		//提取sessionStorage中的dom
		$('.more-box').addClass('dn');
		if (itemStr) {
			(tp!='0') && $('.more-box').removeClass('dn');
			$tbd.find('.crt').html(itemStr);
			return;
		}
		var param = {'transMessage':JSON.stringify(indexParam)};
		$.ajax({'type':'GET','url':ajaxUrl,dataType:'jsonp',jsonp:'f',
			'data':param,
			beforeSend:function(){
				$citem.html(loadImg);
			},
			success:function(json){
				var str = $.tpl(tplMain,json);
				$citem.html(str);
				if (json.responseData.list.length) {
					(tp!='0') && $('.more-box').removeClass('dn');
					SS['item'+tp] = str;
					SS['page'+tp] = '2';
				}
			}
		});
	}

	$more.on('touchend',function(e){
		var tp = $tabs.find('.crt').data('id')+'',no = SS['page'+tp] || 1;
		indexParam.commandInfo.pageNo = no;
		var $crt = $tbd.find('.crt');
		if ($crt.find('.nodata').length) {
			return;
		}
		var param = {'transMessage':JSON.stringify(indexParam)};
		$.ajax({'type':'GET','url':ajaxUrl,dataType:'jsonp',jsonp:'f',
			'data':param,
			beforeSend:function(){
				$more.addClass('more-load pn');
			},
			success:function(json){
				var str = $.tpl(tplMain,json);
				$crt.append(str);
				if (json.responseData.list.length) {
					SS['item'+tp] += str;
					SS['page'+tp] = parseInt(no)+1;
				}
				$more.removeClass('more-load pn');
			}
		});
		e.preventDefault();
	});

})(Zepto);