

var aj_bio = "../Bio/";

function bioNav(){
	$('.right li').click(function(){
		if($(this).hasClass("active")){
			var dir = parseInt($(this).attr("dir"));
			var $bio = $('#bio');
		
			bioPage += dir;
		
			( bioPage < bioCols -1 ) ? $("#bion").addClass("active") : $("#bion").removeClass("active");
			( bioPage != 0 ) ? $("#biop").addClass("active") : $("#biop").removeClass("active");
			var newX = (contWidth*bioPage)*-1;  //-1 is to offset margin, margin decreases as pages increase
			$bio.animate({marginLeft:newX},1000);
		}

	});
}


var bioCols = 0;
var bioPage = 0;
var contWidth = 0;

function linkName(){ //add selectors for name list
	$('#names li').click(function(){  //A name has been selected
			$('#names li').addClass('passiveName'); // set all name blocks inactive
			if ( !Boolean(Number($('#content').css('opacity'))) ){
				$('#content').animate({opacity:1},1000);
			}
			var $li = $(this);
			var $a = $(this).find('a');

			$li.removeClass('passiveName').addClass('activeName');
			var id =  $a.attr('href');
			id = id.split("#")[1];
			$('#full')
				.animate({opacity:0, 'margin-left':300}, 100,'linear', function() {
					$(this).load(aj_bio+id,{"id":id}, function (){
						
						bioCols = 0;
						bioPage = 0;

						$bio = $(this).find('#bio');
						
						var txtHeight = $bio[0].scrollHeight;
						var contHeight = $bio.height();
						contWidth = $bio.width();
						bioCols = Math.ceil(txtHeight/contHeight);
						if (bioCols > 1) {
							var bioColWidth = contWidth*bioCols;
							$bio.css({"-webkit-column-count":String(bioCols),	"width":String(bioColWidth)});
						}else{
							$("#bioPage").remove();
						}
					
					
					
					});

				})
				.animate({opacity:1,'margin-left':0},500,bioNav);


		}
	);
}

var aj_name = "../Name/";


var positionTooltip = function(event) {
	cycle = false;
	var $t = $(event.target);
	if(event.which && $t.is("li")){ //if mouse button is down and pointed at an li
		$('div.tooltip').toggleClass("active inactive");	
		var letter = $t.find('a').attr('href')[1];
		var loc = $t.offset();
		var tWide = $t.width();
		var $tt = $(".tooltip");
		var vis = $tt.css("visibility");
		if (vis === "hidden"){ $tt.toggleClass("active inactive");}
		$tt.find('h3').html(letter);
		var tooltipX = loc.left-tWide*1.5;
		var tooltipY = loc.top ;
		$tt.css({top: tooltipY, left: tooltipX});
	}else{
		hideTooltip();
	}
};

var showTooltip = function(event) {
//	event.preventDefault();
	positionTooltip(event);	
};
	
var hideTooltip = function() {
		$('.tooltip').removeClass("active");
		$('.tooltip').addClass("inactive");
};



$('.alpha li').bind({
	mouseenter : positionTooltip,
	mouseleave: hideTooltip,
	mousedown: showTooltip
});

var clicked = function(event){
	console.log("clicked")
	var $t = $(event.target);
	if ($t.is("li")) alphaSelected($t);
}

$('.alpha').bind({
	mouseup: clicked,
	mouseleave: hideTooltip
	});



var alphaSelected = function(t){ //add click funciton for alphabet list
	hideTooltip();
		$('.alpha li').addClass('passiveAlpha'); // set all alpha blocks inactive
		
		var $li = t;
		var $a = $li.find('a');
		$li.removeClass('passiveAlpha').addClass('activeAlpha');
		var letter =  $a.attr('href')[1];
		$('#backLetter').html(letter);

		$('#sideMenu')
			.animate({opacity:0, 'margin-left':-200}, 100,'linear', function() {
				$(this).load(aj_name+letter,{"letter":letter},nameReset);
			})
			.animate({opacity:1,'margin-left':0},linkName);



};



