var cycle = true;
var $alphas;
var $l;
var i = 0;
var cycleTime = 600;

function cyc(){
	if(cycle){
	if (i == 0) $($alphas[$alphas.length -1]).removeClass("glow");
	$l = $($alphas[i]);
	$l.toggleClass("glow ");
	$l.prev().removeClass("glow");
	if (i < $alphas.length -1 ){
		i++;
		
		} else{i=0;}
	
	}else{
		$alphas.removeClass("glow");
		cycleTimer = null;
	}


}

function init(){
	$('#content').css('opacity','0');
	//Increment the idle time counter every minute.
	var idleInterval = setInterval("timerIncrement()", 30000); // 30 seconds
	var cycleTimer = setInterval("cyc()", cycleTime); // 30 seconds
	//Zero the idle timer on mouse movement.
	$(this).mousemove(function (e) {
	        idleTime = 0;
	});
	$(document).bind("dragstart", function() {
	     return false;
	});
	
//	$("body").css({
//	           'cursor' : 'none'
//	        });
	
}

function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > 3) {
//		alert("reloading");
        //window.location.reload();
    }
}


function nameReset(){
	$('#names li').addClass('passiveName');
	
	$('#sideMenu').addClass('flexspread');
	$('#sideMenu').removeClass('flexmiddle');
	
	$('#names').easyPaginate({
		step:16,
		delay:0,
		numeric:true,
		auto:false,
		nextprev:false
	});

	
}



$(document).ready(function(){

		init();
 });

$(window).load(function() {
		
			jmax = $("ul.alpha li").length -1;
			$('.alpha li').addClass('passiveAlpha');
			$alphas = $(".alpha li").not(".spacer");

	//	$('#content').css('opacity','0');
});





