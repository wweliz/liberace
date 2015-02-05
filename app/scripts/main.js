'use strict';

// USING FITTEXT JQUERY PLUG-IN //////////////////////
$('.herotext').fitText(1.75, { minFontSize: '30px', maxFontSize: '100px' });

// CENTER ABOUT SECTION TEXT /////////////////////////
 
//////////////////////////////////////////////////////////////////////////
// VARIABLE AND FUNCTION DEFINITIONS /////////////////////////////////////
function centerAboutText() {
	var smallScreen = window.matchMedia("screen and (max-width: 40em)")

	if (smallScreen.matches){
		$('first-p').addClass('centeredText');
		console.log('small screen');
	} else {
		$('first-p').removeClass('centeredText');
		console.log('not a small screen');
	}
}
 
// On the original page load...
$(document).ready(function() {
	centerAboutText();
});
 
// When the window is resized... 
$(window).resize(function() {
  centerAboutText();
});


// TINY COLUMNS MEDIA QUERY //////////////////////////
function makeTinyColumns() {
	var mq = window.matchMedia('screen and (min-width: 920px)');

	if(mq.matches) {
	    // width of browser is more than 920px
	   	// show 2 column layout
			// $('.tiny').addClass('.columns .nopadding');
			console.log('mq ran - bigger than 920px');

	} else {
	    // width of browser is less than 920px
			$('div.small-6.columns').removeClass('.columns .nopadding');
			console.log('mq ran - smaller than 920px');
	}	
}

// On the original page load...
// $(document).ready(function() {
// 	makeTinyColumns();
// });

// // When the window is resized... 
// $(window).resize(function() {
//   makeTinyColumns();
// });

// GENERATING SPARKLE BACKGROUND /////////////////////
// $(document).ready(function(){
// 	var layers=8;
// 	var starDensity=0.0025;
	
// 	var ww=$(window).width();
// 	var wh=$(window).height();

// 	var dpi=window.devicePixelRatio;
// 	var cw=ww*dpi;
// 	var ch=wh*dpi;
// 	var stars=ww*ww*starDensity*dpi;
	
// 	var contexts=[];
	
// 	function startBlinking($layer){
// 		function blink(){
// 			TweenMax.to($layer,0.2+(Math.random()*0.4),{
// 				opacity:0.4+(Math.random()*0.4),
// 				onComplete:blink,
// 				repeat:1,
// 				yoyo:true,
// 				ease:Quad.easeInOut
// 			}); 
// 		}
// 		blink();
// 	}
	
// 	for(var i=0;i<layers;i++){
// 		var $layer=$('<canvas/>')
// 			.addClass('layer')
// 			.attr({
// 				width:ww,
// 				height:wh
// 			})
// 			.css({
// 				width:ww,
// 				height:wh
// 			})
// 			.appendTo('body')
// 		;
// 		var ctx=$layer.get(0).getContext('2d');
// 		ctx.fillStyle='#00f6ff';
// 		contexts.push(ctx); 
// 		startBlinking($layer);
// 	}
	
// 	for(var i=0;i<stars;i++){
// 		var x=Math.round(Math.random()*cw)-0.5;
// 		var y=Math.round(Math.random()*ch)-0.5;
		
// 		var s=Math.random();
// 		s=Math.pow(s,8)*1.5;
// 		s+=0.3;
// 		if(Math.random()<0.1){
// 			s*=2;
// 		}
// 		if(s<0) s=0;
		
// 		var a=1;
// 		if(s<1){
// 			a=s;
// 			s=1;
// 		}
		
// 		var id=Math.round(Math.random()*(contexts.length-1));
// 		var ctx=contexts[id];

// 		ctx.translate(x,y);
// 		ctx.globalAlpha = a;
// 		ctx.rotate(Math.PI/4);
// 		ctx.fillRect(0,0,s*dpi,s*dpi);
		
// 		if(s>=1){
// 		ctx.globalAlpha = 0.03;
// 		var shineSize=(s*s*s)*1.5*dpi;
// 		ctx.fillRect((s-(shineSize))/2,(s-(shineSize))/2,shineSize,shineSize);
// 		}	
			
// 		ctx.rotate(-Math.PI/4);
// 		ctx.translate(-x,-y);
// 	}
//  });