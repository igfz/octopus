/**swipeSlide  http://ons.me/500.html */
!function(a,b){'use strict';function h(a,b,c){b.css({'-webkit-transition':'all '+c+'s '+a.opts.transitionType,transition:'all '+c+'s '+a.opts.transitionType})}function i(a,b,c){var d=a.opts.axisX?c+'px,0,0':'0,'+c+'px,0';b.css({'-webkit-transform':'translate3d('+d+')',transform:'translate3d('+d+')'})}function j(a,c){var d=a.opts.ul.children(),e=d.eq(c).find('[data-src]');e&&e.each(function(){var c=b(this);c.is('img')?(c.attr('src',c.data('src')),c.removeAttr('data-src')):(c.css({'background-image':'url('+c.data('src')+')'}),c.removeAttr('data-src'))})}function k(a){e.touch&&!a.touches&&(a.touches=a.originalEvent.touches)}function l(a,b){b.isScrolling=void 0,b._moveDistance=b._moveDistanceIE=0,b._startX=e.touch?a.touches[0].pageX:a.pageX||a.clientX,b._startY=e.touch?a.touches[0].pageY:a.pageY||a.clientY}function m(a,b){b.opts.autoSwipe&&p(b),b.allowSlideClick=!1,b._curX=e.touch?a.touches[0].pageX:a.pageX||a.clientX,b._curY=e.touch?a.touches[0].pageY:a.pageY||a.clientY,b._moveX=b._curX-b._startX,b._moveY=b._curY-b._startY,'undefined'==typeof b.isScrolling&&(b.isScrolling=b.opts.axisX?!!(Math.abs(b._moveX)>=Math.abs(b._moveY)):!!(Math.abs(b._moveY)>=Math.abs(b._moveX))),b.isScrolling&&(a.preventDefault?a.preventDefault():a.returnValue=!1,h(b,b.opts.ul,0),b._moveDistance=b._moveDistanceIE=b.opts.axisX?b._moveX:b._moveY),b.opts.continuousScroll||(0==b._index&&b._moveDistance>0||b._index+1>=b._liLength&&b._moveDistance<0)&&(b._moveDistance=0),i(b,b.opts.ul,-(b._slideDistance*b._index-b._moveDistance))}function n(a){a.isScrolling||o(a),(c.ie10||c.ie11)&&(Math.abs(a._moveDistanceIE)<5&&(a.allowSlideClick=!0),setTimeout(function(){a.allowSlideClick=!0},100)),Math.abs(a._moveDistance)<=a._distance?q(a,'','.3'):a._moveDistance>a._distance?q(a,'prev','.3'):Math.abs(a._moveDistance)>a._distance&&q(a,'next','.3'),a._moveDistance=a._moveDistanceIE=0}function o(a){a.opts.autoSwipe&&(p(a),a.autoSlide=setInterval(function(){q(a,'next','.3')},a.opts.speed))}function p(a){clearInterval(a.autoSlide)}function q(a,b,c){'number'==typeof b?(a._index=b,a.opts.lazyLoad&&(a.opts.continuousScroll?(j(a,a._index),j(a,a._index+1),j(a,a._index+2)):(j(a,a._index-1),j(a,a._index),j(a,a._index+1)))):'next'==b?(a._index++,a.opts.lazyLoad&&(a.opts.continuousScroll?(j(a,a._index+2),a._index+1==a._liLength?j(a,1):a._index==a._liLength&&j(a,0)):j(a,a._index+1))):'prev'==b&&(a._index--,a.opts.lazyLoad&&(a.opts.continuousScroll?(j(a,a._index),0==a._index?j(a,a._liLength):a._index<0&&j(a,a._liLength-1)):j(a,a._index-1))),a.opts.continuousScroll?a._index>=a._liLength?(r(a,c),a._index=0,setTimeout(function(){r(a,0)},300)):a._index<0?(r(a,c),a._index=a._liLength-1,setTimeout(function(){r(a,0)},300)):r(a,c):(a._index>=a._liLength?a._index=0:a._index<0&&(a._index=a._liLength-1),r(a,c)),''!==arguments[1]&&a.opts.callback(a._index,a._liLength,a.$el)}function r(a,b){h(a,a.opts.ul,b),i(a,a.opts.ul,-a._index*a._slideDistance)}var f,g,c={ie10:a.navigator.msPointerEnabled,ie11:a.navigator.pointerEnabled},d=['touchstart','touchmove','touchend'],e={touch:a.Modernizr&&Modernizr.touch===!0||function(){return!!('ontouchstart'in a||a.DocumentTouch&&document instanceof DocumentTouch)}()};c.ie10&&(d=['MSPointerDown','MSPointerMove','MSPointerUp']),c.ie11&&(d=['pointerdown','pointermove','pointerup']),f={touchStart:d[0],touchMove:d[1],touchEnd:d[2]},b.fn.swipeSlide=function(a){var b=[];return this.each(function(c,d){b.push(new g(d,a))}),b},g=function(a,c){var d=this;d.$el=b(a),d._distance=50,d.allowSlideClick=!0,d.init(c)},g.prototype.init=function(d){function p(){var c,a=e.opts.ul.children();e._slideDistance=e.opts.axisX?e.opts.ul.width():e.opts.ul.height(),h(e,e.opts.ul,0),i(e,e.opts.ul,-e._slideDistance*e._index),h(e,a,0),c=e.opts.continuousScroll?-1:0,a.each(function(a){i(e,b(this),e._slideDistance*(a+c))})}var g,e=this;return e.opts=b.extend({},{ul:e.$el.children('ul'),li:e.$el.children().children('li'),index:0,continuousScroll:!1,autoSwipe:!0,speed:4e3,axisX:!0,transitionType:'ease',lazyLoad:!1,firstCallback:function(){},callback:function(){}},d),e._index=e.opts.index,e._liLength=e.opts.li.length,e.isScrolling,e.opts.firstCallback(e._index,e._liLength,e.$el),e._liLength<=1?(e.opts.lazyLoad&&j(e,0),!1):(e.opts.continuousScroll&&e.opts.ul.prepend(e.opts.li.last().clone()).append(e.opts.li.first().clone()),e.opts.lazyLoad&&(j(e,e._index),e.opts.continuousScroll?(j(e,e._index+1),j(e,e._index+2),0==e._index?j(e,e._liLength):e._index+1==e._liLength&&j(e,1)):0==e._index?j(e,e._index+1):e._index+1==e._liLength?j(e,e._index-1):(j(e,e._index+1),j(e,e._index-1))),p(),(c.ie10||c.ie11)&&(g='',g=e.opts.axisX?'pan-y':'none',e.$el.css({'-ms-touch-action':g,'touch-action':g}),e.$el.on('click',function(){return e.allowSlideClick})),o(e),e.$el.on(f.touchStart,function(a){k(a),l(a,e)}),e.$el.on(f.touchMove,function(a){k(a),m(a,e)}),e.$el.on(f.touchEnd,function(){n(e)}),e.opts.ul.on('webkitTransitionEnd MSTransitionEnd transitionend',function(){o(e)}),b(a).on('onorientationchange'in a?'orientationchange':'resize',function(){clearTimeout(e.timer),e.timer=setTimeout(p,150)}),void 0)},g.prototype.goTo=function(a){var b=this;q(b,a,'.3')}}(window,window.Zepto||window.jQuery);

/** 日期插件 */
Zepto.datepicker=function(c,l){var m={init:function(){this._target=c;this._date=new Date;this._formatDate();l.init&&l.init()},bind:function(){this._picker=function(){var b=[];b.push('<div class="datepicker-box">');b.push('\t<div class="datepicker-header">');b.push('\t<span class="datepicker-pre"><b></b></span>');b.push('\t<span class="datepicker-next"><b></b></span>');b.push(" <h4></h4>");b.push("\t</div>");b.push('\t<table class="datepicker-body">');b.push("\t<thead>");b.push("\t<tr>");b.push('\t<th>\u4e00</th><th>\u4e8c</th><th>\u4e09</th><th>\u56db</th><th>\u4e94</th><th class="datepicker-weekend">\u516d</th><th class="datepicker-weekend">\u65e5</th>');b.push("\t</tr>");b.push("\t</thead>");b.push("\t<tbody>");b.push("\t</tbody>");b.push("\t</table>");b.push("</div>");return $(b.join(""))}();this._generateDays();var d=this;this._picker.find("span").on("touchstart",function(){$(this).addClass("hover")}).on("touchend",function(){$(this).removeClass("hover")}).tap(function(){$(this).hasClass("datepicker-pre")?d._date.setMonth(d._date.getMonth()-1):d._date.setMonth(d._date.getMonth()+1);d._generateDays()});$("body").append('<div class="dp-masking"></div>');this.mask=$(".dp-masking");this._picker.click(function(b){b.preventDefault();b.stopPropagation()});this.mask.click(function(b){d._picker.hide();d.mask.hide()});return this},insert:function(){this._picker.insertAfter(this._target)},show:function(){this._picker.show();this.mask.show()},hide:function(){this._picker.hide();this.mask.hide()},_generateDays:function(){var d=this._date.getFullYear(),b=this._date.getMonth()+1,f=this._date.getDate(),n=(new Date(new Date(d,b,1)-864E5)).getDate(),e=function(){var a=(new Date(d,b-1,1)).getDay();0==a&&(a=7);return a}();this._picker.find("h4").html(d+" \u5e74 "+b+" \u6708");var a=[],g=1;a.push("<tr>");for(var h=1;h<e;h++)a.push("<td>&nbsp;</td>");for(h=e;8>h;h++,g++)a.push('<td class="datepicker-td'),g==f&&a.push(" cur"),6<=h&&a.push(" datepicker-weekend"),a.push('">'),a.push(g),a.push("</td>");a.push("</tr>");for(var k=0,e=Math.ceil((n+e)/7)-2;k<e;k++){a.push("<tr>");for(h=1;8>h;h++,g++)a.push('<td class="datepicker-td'),g==f&&a.push(" cur"),6<=h&&a.push(" datepicker-weekend"),a.push('">'),a.push(g),a.push("</td>");a.push("</tr>")}e=n-g+1;if(0!=e){a.push("<tr>");for(k=0;k<e;k++,g++)a.push('<td class="datepicker-td'),g==f&&a.push(" cur"),6<=k&&a.push(" datepicker-weekend"),a.push('">'),a.push(g),a.push("</td>");for(k=e+1;8>k;k++)a.push("<td>&nbsp;</td>");a.push("</tr>")}this._picker.find("tbody")[0].innerHTML=a.join("");var c=this;this._picker.find(".datepicker-td").unbind().on("touchstart",function(){$(this).addClass("hover")}).on("touchend",function(){$(this).removeClass("hover")}).tap(function(){c._picker.find(".datepicker-td").removeClass("cur");$(this).addClass("cur");var a=parseInt($(this).text(),10);c._date=new Date(d,b-1,a);c.hide();c._formatDate();l.callback&&l.callback()})},_formatDate:function(){var d=this._target,b=this._date.getFullYear(),f=this._date.getMonth()+1,f=9<f?f:"0"+f,c=this._date.getDate(),c=9<c?c:"0"+c,e="\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d".split("")[this._date.getDay()];d.text(b+"\u5e74"+f+"\u6708"+c+"\u65e5\uff08\u5468"+e+"\uff09");d.data("date",b+"-"+f+"-"+c)}};m.init();var p=!1;c.click(function(){p||(m.bind().insert(),p=!0);m.show()})};$.fn.datepicker=function(c){$.datepicker(this,c)};

!function() {
	var $f = $('.filter'),$sd = $('aside'),
		$fd = $('.feed-wrap'),$mk = $('.masking'),
		$ckbox = $('.check-box'),$mch = $('.match-list'),
		$mchli = null,$result = null,$bn = $('#banner'),
		$dp = $('.datepicker'),$search = $('.search'),
		tplDefault=$('#tplDefault').html(),
		tplMain=$('#tplMain').html(),
		tplMatch=$('#tplMatch').html(),
		tplBanner=$('#tplBanner').html();

	//ajax 参数
	var paraStr = JSON.stringify(ajaxParam);
	var indexParam = JSON.parse(paraStr);
	var bannerParam = JSON.parse(paraStr);
	indexParam.busiCode = '550001';
	indexParam.commandInfo = {'pageNo':'1','pageSize':'10','screeningTime':getDate(),'GameAgainst':''};
	bannerParam.busiCode = '550009';

	//日历插件初始化，加回调
	$(".datepicker").datepicker({
		callback: function() {
			$f.find('.ft-match').text('全部赛事');
			var dt = $dp.data('date');
			indexParam.commandInfo.screeningTime = dt;
			SS['date'] = dt+';'+$dp.text();
			initIndexData();
		},
		init:function(){
			var dateStr = SS['date'];
			//提取sessionStorage中的日期
			if (dateStr) {
				var arr = dateStr.split(';');
				$dp.data('date',arr[0]);
				$dp.text(arr[1]);
				indexParam.commandInfo.screeningTime = arr[0];
			}
			initIndexData();
		}
	});

	//首页列表ajax
	function initIndexData(){
		var date = $dp.data('date'),tipJson = SS['tip'+date];
		//提取sessionStorage中的json
		if (tipJson){
			var json = JSON.parse(tipJson);
			var str = $.tpl(tplDefault,json);
			$fd.html(str);
			initMatch(json.responseData.leagueMatchList);//初始化比赛 
			return;
		}
		var param = {'transMessage':JSON.stringify(indexParam)};
		$.ajax({'type':'GET','url':ajaxUrl,dataType:'jsonp',jsonp:'f',
			'data':param,
			beforeSend:function(){
				$fd.html(loadImg);	//等待效果
			},
			success:function(json){
				var str = $.tpl(tplDefault,json);
				$fd.html(str);
				initMatch(json.responseData.leagueMatchList);//初始化比赛
				SS['tip'+date] = JSON.stringify(json);	//缓存到sessionStorage
			}});
	}

	//获取当前的格式化日期
	function getDate(){
	  var n=new Date(),y=n.getFullYear(),m=n.getMonth(),d=n.getDate();
	  return y+'-'+(m+1)+'-'+((d<10)?'0'+d:d);
	}

	//请求轮播图数据
	!function(){
		var banStr = SS['banner'];
		//提取sessionStorage中的dom
		if (banStr){ $bn.html(banStr);initBanner(); return;}
		var param = {'transMessage':JSON.stringify(bannerParam)};
		$.ajax({'type':'GET','url':ajaxUrl,dataType:'jsonp',jsonp:'f',
			'data':param,
			beforeSend:function(){
				$bn.html(loadImg);	//等待效果
			},
			success:function(json){
				var list = json.responseData.bannerImageList;
				var json = {'banner':list,'l':list.length};
				var str = $.tpl(tplBanner,json);
				$bn.html(str);	//渲染轮播图DOM
				//加载轮播图
				if (list.length) {
					initBanner();
					SS['banner'] = str;	//缓存到sessionStorage
				}
			}});
	}();

	//执行插件
	function initBanner(){
		$bn.swipeSlide({
	    firstCallback : function(i,sum,me){
	      me.find('.dot').children().first().addClass('cur');
	    },callback : function(i,sum,me){
	      me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
	    }
		});
	}

	//赛事集合
	function initMatch(list){
		var json = {'matchs':list,'msize':list.length};
		var str = $.tpl(tplMatch,json);
		initLeague(list);
		$mch.html(str);
		$mchli = $result = $mch.find('li');	//缓存结果集对象
	}

	//初始化赛事
	function initLeague(list){
		var str ='',l=list.length;
		for (var i=0;i<l;i++) {
			if(i%4==0){str += '<div class="item">';}	//每四个为一个组
			str += '<span class="cked">'+list[i].leagueName+'</span>';
			if ((i+1)==l && l%4) {	//补足4个元素，只为看着舒服
				var size = 4-(l%4);
				for (var j=0;j<size;j++) {str+='<div></div>';}
			}
			if((i+1)%4==0){str += '</div>';}
		}
		$('.team-tag').html(str);
	}

	//赛事全选
	$ckbox.on('tap','span',checkCallBack);
	function checkCallBack(){
		var $t = $(this),a = $t.is('.all'),n = $t.is('.nor'),
			$s = $t.closest('.check-box').find('.item>span');
		if (a) {$s.addClass('cked');
		}else if (n) {$s.toggleClass('cked');
		}else{$t.toggleClass('cked');}
		filterTeam();
		calHeight();
	}

	//选联赛过滤组队
	function filterTeam(){
		var $cked = $ckbox.find('.cked');
		$mchli.addClass('dn');
		$cked.map(function(){
			var txt = $(this).text();
			$mchli.filter('[data-name="'+txt+'"]').removeClass('dn');
		});
		$result = $mchli.not('.dn');
		$search.val('');	//搜索框每次都清空
	}

	//点击筛选后的组队
	$mch.on('tap','.useful',checkTeamCallBack);
	function checkTeamCallBack(){
		var host = $(this).data('host'),guest = $(this).data('guest');
		$f.find('.ft-match').text(host + ' VS ' +guest);
		indexParam.commandInfo.GameAgainst = $(this).data('mid')+'';
		var param = {'transMessage':JSON.stringify(indexParam)};
		$.ajax({'type':'GET','url':ajaxUrl,dataType:'jsonp',jsonp:'f',
			'data':param,
			beforeSend:function(){
				$fd.html(loadImg);	//等待效果
			},
			success:function(json){
				var str = $.tpl(tplMain,json);
				$fd.html(str);
		}});

		requestAnimationFrame(function(){
			$sd.find('.back').trigger('tap');
		});
	}

	//赛事弹出层
	$f.on('tap','.btn-match',matchCallBack);
	function matchCallBack(){
		$sd.show();
		$sd.addClass('slideIn');
		$mk.show();
		calHeight();
	}

	//重新计算侧边栏的高度
	function calHeight(){
		requestAnimationFrame(function(){
			var h = $('.s-match').height();
			$sd.height(h);
		});
	}

	//侧边栏返回按钮
	$sd.on('tap','.back',matchCloseCallBack);
	$('.masking').on('tap',matchCloseCallBack);
	function matchCloseCallBack(){
		$sd.addClass('slideOut');
		$mk.hide();
	}

	//赛事列表再次查询
	$sd.on('tap','.btn-search',searchCallBack);
	function searchCallBack(){
		var input = $search.val();
		$result.addClass('dn');
		if (input.length==0) {	//啥都没写就默认最初的数据
			$result.removeClass('dn');
			return;
		}
		$result.filter('[data-id*="'+input+'"]').removeClass('dn');
		$result.filter('[data-host*="'+input+'"]').removeClass('dn');
		$result.filter('[data-guest*="'+input+'"]').removeClass('dn');
	}

	//侧边栏动画结束
	$sd.on('webkitAnimationEnd', function(){
		var $t = $(this);
		var state = $t.hasClass('slideOut');
		if (state){
			$t.removeClass('slideOut');$t.hide();
		}
		setTimeout(function(){
			$fd.add($bn).toggleClass('pn');	//为了解决click的延迟300ms
			$search.toggleClass('pn');
		},300);
	});
	//SS.clear();
}();