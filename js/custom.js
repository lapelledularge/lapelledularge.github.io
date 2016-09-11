;(function () {
	
	'use strict';

	var BGPREFIX = './images/bg/';
	var BGSUFFIX = '.jpg';
	var BGINTERVAL = 10000;
	var FADEINTERVAL = BGINTERVAL/10;

	var bgParams = {
		i: 0,
		max: -1,
		j: 0
	}

	var backgroundInterval; // interval between 2 animations
	var backgroundTimeout; // timeout to do smt after animation

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
		startBgInterval();
		lookForMax(bgParams);
	}

	var stopBgInterval = function(){
		clearInterval(backgroundInterval)
	}

	var startBgInterval = function(){
		backgroundInterval = setInterval(function(){
			nextBackground();
		}, BGINTERVAL)
	}

	var previousBackground = function() {
		bgParams.i--;

		if (bgParams.max != -1) {
			if (bgParams.i < 0){
				bgParams.i = bgParams.max - 1;
			}

			setBg(bgParams.i);
		};
	}

	var nextBackground = function() {
		bgParams.i++;

		if (bgParams.max != -1) {
			if (bgParams.i >= bgParams.max){
				bgParams.i = 0;
			}

			setBg(bgParams.i);
		};
	}

	var setBg = function(i) {
		$("#bgTemp").css('display', 'none');
		$("#bgTemp").css('background-image', 'url(' + BGPREFIX + i + BGSUFFIX + ')');
		$("#bgTemp").fadeIn(FADEINTERVAL);

		setTimeout(function(){
			$('body').css('background-image', 'url(' + BGPREFIX + i + BGSUFFIX + ')');
		}, FADEINTERVAL);
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

	var toogleBgExpand = function() {
		$("#bgExpandCompress").on('click', function(){
			if ($("#bgExpandCompress").hasClass("icon-expand")){ // if it's compressed
				// Change icon
				$("#bgExpandCompress").removeClass("icon-expand");
				$("#bgExpandCompress").addClass("icon-compress");

				// Expand header
				$("#fh5co-main").css("margin-top", $(window).height())

				// Show previous/next arrows
				$(".icon-arrow-left").css("opacity", "1")
				$(".icon-arrow-right").css("opacity", "1")

				// Start background slideshow
				stopBgInterval()

			} else { // it's expanded, let's compress it
				// Change icon
				$("#bgExpandCompress").removeClass("icon-compress");
				$("#bgExpandCompress").addClass("icon-expand");

				// Compress header
				$("#fh5co-main").css("margin-top", "5em")

				// Hide previous/next arrows
				$(".icon-arrow-left").css("opacity", "0")
				$(".icon-arrow-right").css("opacity", "0")

				// Stop background slideshow
				startBgInterval()
			}
		})

		$("#bgPrevious").on('click', function(){
			previousBackground()
		})

		$("#bgNext").on('click', function(){
			nextBackground()
		})
	}

	// Document on load.
	$(function(){
		backgroundMng();
		infoClickInit();
		createEmailAdress();
		toogleBgExpand();
	});


}());