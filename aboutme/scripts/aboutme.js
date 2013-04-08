$(function(){
	$('.navItem').click(function(){
		var $this = $(this),
		$activeTab = $('#'+$this.data('tab')),
		$tab = $activeTab.siblings('.tabs');
		$activeTab.stop().animate({'left':'0'});
		$tab.stop().animate({'left':'100%'},2000);
	});
});