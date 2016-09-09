;(function () {
	
	'use strict';

	var infoClickInit = function() {
		$('li.icon').on('click', function(event) {
			event.preventDefault();
			// var $this = $(this),
			// 	data = $this.data('tab'),
			// 	pie = $this.data('pie');

			// add/remove active class
			$('li.icon').removeClass('active-info');
			// $this.closest('li').addClass('active-info');
			$(this).addClass('active-info');

			// $('.icon.active').addClass('animated fadeOutDown');

			// setTimeout(function(){
			// 	$('.fh5co-tab-content.active').removeClass('active animated fadeOutDown fadeInUp');
			// 	$('.fh5co-tab-content[data-content="'+data+'"]').addClass('animated fadeInUp active');
			// 	getHeight();
			// }, 500);

			// if ( pie === 'yes' ) {
			// 	setTimeout(function(){
			// 		pieChart();
			// 	}, 800);
			// }
			
		})
	};

	// Document on load.
	$(function(){
		infoClickInit();
	});


}());