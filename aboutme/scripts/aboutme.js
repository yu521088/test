$(function(){
	var ww = $(window).width(),
	mLeft = (ww-960)>0?(ww-960)/2:0;
	$('#bikeSlide').stellar();
	$('#nav').css({'marginLeft':mLeft,'z-index':'1'});
	//navigate to the right tab
	var hash = location.hash,
	selectedTabId = 'home';
	if(hash){
		hash = hash.substring(1);
		//get tab id, default to be homeTab
		hash = hash.split('Tab').join('');
		switch(hash){
			case 'bike':
			case 'music':
			case 'blank':
			case 'blank2':
				selectedTabId = hash;
				break;
			default:
				selectedTabId = 'home';
		}
	}
	$('.navLi').click(function(){
		var $link = $(this).find('.navItem');
		$activeTab = $('#'+$link.data('tab')),
		$tab = $activeTab.siblings('.tabs');
		$tab.removeClass('activeClass');
		$activeTab.addClass('activeClass');
		$('html, body').stop().animate({'scrollLeft':$('#'+$link.data('tab')).css('left')},300);
	});
	$('a:contains("'+selectedTabId+'")').parent().trigger('click');
	$('#bikeTab').delegate('.viewsWrapper','click',function(){
		var $modelBg = $('#modelBg'),
		$model = $('#model'),
		wWidth,wHeight,mWidth,mHeight,mLeft,mTop;
		$modelBg.removeClass('hidden').css('background','#000').stop().animate({'opacity':'0.6'},100);
		$model.css('visibility','hidden').removeClass('hidden');
		$model.find('img').attr('src',$(this).find('img').attr('src'));
		mWidth = $model.width();
		mHeight = $model.height();
		wWidth = $(window).width();
		wHeight = $(window).height();
		mLeft = (wWidth-mWidth)>0?(wWidth-mWidth)/2:0;
		mTop = (wHeight-mHeight)>0?(wHeight-mHeight)/2:0;
		$model.css({'marginLeft':mLeft,'marginTop':mTop,'visibility':'visible'});
	});
	$('body').delegate('#modelBg','click',function(){
		$(this).addClass('hidden');
		$('#model').addClass('hidden');
	});
	$('#album').delegate('.musicImg','click',function(){
		$('#album_block').css('display','block');
		$('#album_detail').css('display','block');
		$('#singer_img').attr('src',$(this).attr('src'));
		$('#singer_brief').html($(this).attr('alt'));
	}).delegate('#album_block','click',function(){
		$(this).css('display','none');
		$('#album_detail').css('display','none');
	});
	setInterval(function(){
		var sTop = $('.activeClass').scrollTop();
		if(sTop>10){
			var nHeight = $('#nav').outerHeight(true);
			//$('#nav').stop().animate({'margin-top':'-121px'},300);
			$('#nav').css({'margin-top':'-121px'});
		}else{
			//$('#nav').stop().animate({'margin-top':0},300);
			$('#nav').css({'margin-top':'0'});
		}
	},100);
});