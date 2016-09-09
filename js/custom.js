;(function () {
	
	'use strict';

	var infoClickInit = function() {
		$('li.icon').on('click', function(event) {
			event.preventDefault();

			// add/remove active class
			var anotherInfoIsSelected = !$(this).is($('li.active-info'))
			$('li.icon').removeClass('active-info');

			if(anotherInfoIsSelected){
				$(this).addClass('active-info');
			}
			
		})
	};

	// Document on load.
	$(function(){
		infoClickInit();
	});


}());