/* global TweenMax, Quad*/
'use strict';

//////////////////////////////////////////////////////////////////////////
// FOUNDATION 5 MEDIA BREAKPOINTS ////////////////////////////////////////
// Small screens -- max-width 640px (max-width: 40em)
// Medium screens -- min-width 641px (40.063em) and max-width 1024px (64em)
// Large screens -- min-width 1025px (64.063em)

// INITIALIZE FOUNDATION /////////////////////////////////////////////////
$(document).foundation();

// GENERATE SPARKLE BACKGROUND ///////////////////////////////////////////
function makeSparkles() {
	var layers=3;
	var starDensity=0.0125;

	var dh = $(document).height();
	var fh = $('.footer').height();
	var wh = (dh - fh );// returns height of HTML document
	var ww =$(document).width(); // returns width of HTML document

	var dpi=window.devicePixelRatio;
	var cw=ww*dpi;
	var ch=wh*dpi;
	var stars=ww*ww*starDensity*dpi;
	
	var contexts=[];
	
	function startBlinking($layer){
		function blink(){
			TweenMax.to($layer,0.2+(Math.random()*0.4),{
				opacity:0.4+(Math.random()*0.4),
				onComplete:blink,
				repeat:1,
				yoyo:true,
				ease:Quad.easeInOut
			}); 
		}
		blink();
	}
	
	for(var i=0;i<layers;i++){
		var $layer=$('<canvas/>')
			.addClass('layer')
			.attr({
				width:ww,
				height:wh
			})
			.css({
				width:ww,
				height:wh
			})
			.prependTo('body')
		;
		var ctx=$layer.get(0).getContext('2d');
		ctx.fillStyle='#00f6ff';
		contexts.push(ctx); 
		startBlinking($layer);
	}
	
	for(var i=0;i<stars;i++){
		var x=Math.round(Math.random()*cw)-0.5;
		var y=Math.round(Math.random()*ch)-0.5;
		
		var s=Math.random();
		s=Math.pow(s,8)*1.5;
		s+=0.3;
		if(Math.random()<0.1){
			s*=2;
		}
		if(s<0) s=0;
		
		var a=1;
		if(s<1){
			a=s;
			s=1;
		}
		
		var id=Math.round(Math.random()*(contexts.length-1));
		var cntxt=contexts[id];

		cntxt.translate(x,y);
		cntxt.globalAlpha = a;
		cntxt.rotate(Math.PI/4);
		cntxt.fillRect(0,0,s*dpi,s*dpi);
		
		if(s>=1){
			cntxt.globalAlpha = 0.03;
			var shineSize=(s*s*s)*1.5*dpi;
			cntxt.fillRect((s-(shineSize))/2,(s-(shineSize))/2,shineSize,shineSize);
		}	
		
		cntxt.rotate(-Math.PI/4);
		cntxt.translate(-x,-y);
	}
}

// RESIZE SPARKLE CANVAS TO MATCH SCREEN /////////////////////////////////
function resizeCanvas() {
	var canvas = $('.layer');

	canvas.height = $(window).height(); - $('.footer').height();
	canvas.width = $(window).width();
}

// RESIZE HEROTEXT USING FITTEXT /////////////////////////////////////////
$('.herotext').fitText(1.75, { minFontSize: '30px', maxFontSize: '100px' });

// CENTER ABOUT SECTION TEXT /////////////////////////////////////////////
function centerAboutText() {
	// Foundation small screens media breakpoint -- max-width 640px (max-width: 40em)
	var smallScreen = window.matchMedia('screen and (max-width: 40em)');

	if (smallScreen.matches){
		$('.first-p').addClass('centeredText');
	} else {
		$('.first-p').removeClass('centeredText');
	}
}

// FORMAT 2 COLUMN LAYOUT FOR SKILLS SECTION /////////////////////////////
function make2Columns() {
	var twoColumn = window.matchMedia('(min-width: 40.063em) and (max-width: 850px)');

	if (twoColumn.matches){
		$('.2col').removeClass('columns nopadding');
	} else {
		$('.2col').addClass('columns nopadding');
	}
}

// INITIALIZE RESPONSIVE SLIDER FOR WORK SECTION /////////////////////////
function initSlider() {
	$('.slider').slick({
		accessibility: true,
		dots: false,
		infinite: true,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
}

// REPLACE PROJECT TEXT ON MOUSEOVER ///////////////////////////////////// 
$('.mice').mouseover(function() {
	$('.project-text').html("<h5>Mice On Main: The App</h5><p>Mice On Main is a webapp that utilizes the HTML5 geolocation API to help visitors to Greenville find the mice sculptures hidden along Main Street in Greenville, SC.</p><h6>Build Summary:</h6><p>HTML, Sass, JavaScript, jQuery, Underscore, local camera access, Parse SDK, HTML5 geolocation API</p>");
});

$('.dice').mouseover(function() {
	$('.project-text').html("<h5>AwesomeDice</h5><p>AwesomeDice is a webapp that simulates rolling dice at a casino table. Users input the number of dice rolled and the number of sides on each die, and a then shown a representation of the dice on the table.</p><h6>Build Summary:</h6><p>HTML, Sass, JavaScript View the project live here, or check out my code on GitHub.</p>");
});

$('.eskimo').mouseover(function() {
	$('.project-text').html("<h5>English Theatre Berlin Playbill</h5><p>English Theatre Berlin is the German capital's only producing and presenting organization expressly dedicated to English as the working language. I designed and illustrated a poster for the play Prophecy of a Nameless Eskimo, which ran from April to May 2009.</p>");
});

$('.chomarat').mouseover(function() {
	$('.project-text').html("<h5>Chomarat Rebrand</h5><p>The French textile maker Chomarat manufactures reinforcement materials for the composite and building industries. When the company expanded in 2009, they needed help implementing their new brand identity in the American market.</p>");
});

$('.hoowaki').mouseover(function() {
	$('.project-text').html("<h5>Hoowaki Brand Development</h5><p>Hoowaki transforms the surfaces of common materials through micro technology on extruded and molded products and processes. I worked with the startups's founders to create a logo that was modern and fresh, but would allow for flexibility and innovation as the company expanded into new product fields and markets. The two water droplets in the center of the logo represent one of Hoowaki's first technologies: the ability to make surfaces hydrophobic.</p>");
});

$('.photography').mouseover(function() {
	$('.project-text').html("<h5>Photography</h5><p>All images captured with a Canon EOS Rebel XS and edited with Adobe Lightroom and/or Photoshop.</p>");
});

$('.fluor').mouseover(function() {
	$('.project-text').html("<h5>Fluor Government Group Cutsheet</h5><p>Fluor offers a full range of professional and technical support services for government clients and contractors through its Technical Support Services organization. TSS enhances clients’ operational effectiveness with support services in operations; nuclear services; health, safety, environment and quality (HSE&Q); project; and engineering support.</p>");
});

$('.scansource').mouseover(function() {
	$('.project-text').html("<h5>ScanSource Marketing Rate Card</h5><p>ScanSource is a value-added distributor offering AIDC, point-of-sale, communications and physical security solutions; this rate card lists the price for print, online, and event marketing projects.</p>");
});

// CALL FUNCTIONS ON PAGE LOAD & RESIZE //////////////////////////////////
$(document).ready(function() {
	makeSparkles();
	centerAboutText();
	make2Columns();
	initSlider();
});

$(window).resize(function() {
	resizeCanvas();
	centerAboutText();
	make2Columns();
});