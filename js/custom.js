;(function () {
	
	'use strict';

	var BGPREFIX = './images/bg/';
	var BGSUFFIX = '.jpg';
	var BGINTERVAL = 10000;
	var FADEINTERVAL = BGINTERVAL/10;

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

	var backgroundMng = function() {

		var params = {
			i: 1,
			max: -1,
			j: 0
		}

		setInterval(function(){
			if (params.i >= params.max){
				params.i = 0;
			}

			$("#bgTemp").css('display', 'none');
			$("#bgTemp").css('background-image', 'url(' + BGPREFIX + params.i + BGSUFFIX + ')');
			$("#bgTemp").fadeIn(FADEINTERVAL);

			setTimeout(function(){
				$('body').css('background-image', 'url(' + BGPREFIX + params.i + BGSUFFIX + ')');
				params.i++;
			}, FADEINTERVAL);

		}, BGINTERVAL)

		lookForMax(params);

	}

	var lookForMax = function (bgParameters){
		fileExist(bgParameters.j, function(){
			bgParameters.max = bgParameters.j;
			bgParameters.j = -1;
			preloadBgs(bgParameters.max);
			console.log("Done: " + bgParameters.max + " " + bgParameters.j);
		}.bind(bgParameters.max, bgParameters.j, bgParameters.lookForMax), function(){
			bgParameters.j++;
			lookForMax(bgParameters);
		})
	}

	var preloadBgs = function (max) {
		for (var i = max - 1; i >= 0; i--) {
			$('#bgs').append("<img class=\"bg\" id=\"" + i + "\" src=\"" + BGPREFIX + i + BGSUFFIX + "\"></li>");
		};
	}

	var fileExist = function (idx, errorCallback, successCallback){
		var ret;

		$.ajax({
			url: BGPREFIX + idx + BGSUFFIX,
			type: 'HEAD',
			error: errorCallback,
			success: successCallback
		});
	}

	var createEmailAdress = function () {
		$("#email").text($("#email").text().replace("nawak", "@"))
	}

	// Document on load.
	$(function(){
		backgroundMng();
		infoClickInit();
		createEmailAdress();
	});


}());