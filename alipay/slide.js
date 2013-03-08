;(function($){
	//default settings
	var defaultSetting = {
		gap:'3000',//time gap
		dir:'ltr',// direction: left to right, top to bottom, right to left, bottom to top;
		listLength:1,//length of the list
		speed:'fast',//animate speed
		imgWidth:'990',
		callback:function(){}
	};
	
	var pub_methods = {
		init:function(options){
				var setting = $.extend({},defaultSetting,options||{});
				return $(this).each(function(){
					$(this).data('setting',setting);
					$(this).data('slide',new $.PicSlide(this,0));
				});
			},
		slideFromIndex:function(index){
			$(this).data('slide').slideFromIndex(this,index);
			return this;
		}
	};
	
	$.fn.slideShow = function(options){
		if(pub_methods[options]){
			return pub_methods[options].apply(this,Array.prototype.slice.call(arguments, 1));
		}else{
			return pub_methods.init.call(this,options);
		}
	}
	
	$.PicSlide = function(list,index){
		var $this = $(list),
		setting = $this.data('setting'),
		t;
		
		setting.listLength = $this.find('li').length;
		index = setting.dir=='ltr'?index:setting.listLength-1;
		$this.css('left',-990*index);
		slideFromIndex(list,index);
	
		function slideFromIndex(list,i){
			var ii = i,$list = $(list);
			if(typeof(setting.callback)==='function'){
				setting.callback.call(this,ii);
			}
			$list.stop().animate({'left':-990*ii},setting.speed);
			/*$list.find('img').stop();
			$list.find('img:eq('+ii+')').animate({'width':792,'margin-top':37},setting.speed/2);
			$list.find('img:eq('+ii+')').animate({'width':990,'margin-top':0},setting.speed/2);*/
			if(t){
				clearInterval(t);
			}
			function a(){
				ii += setting.listLength;
				setting.dir=='ltr'?ii++:ii--;
				ii = ii%setting.listLength;
				if(typeof(setting.callback)==='function'){
					setting.callback.call(this,ii);
				}
				$list.stop().animate({'left':-990*ii},setting.speed);
				/*$list.find('img').stop();
				$list.find('img:eq('+ii+')').animate({'width':792,'margin-top':37},setting.speed/2);
				$list.find('img:eq('+ii+')').animate({'width':990,'margin-top':0},setting.speed/2);*/
			}
			t = setInterval(a,setting.gap);
		}
		this.slideFromIndex = slideFromIndex;
	}
})(jQuery);