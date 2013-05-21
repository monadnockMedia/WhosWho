idleTime = 0;
var j = 0;
var delay = 500;
var jamx = 0;
var $current;

function cycle(){
	$current = $("ul.alpha li:eq(" + j + ")");
	$current.addClass("glow");
	console.log($current);
			(j == jmax) ? j=0 : j++;
			cycle();
		
}

function init(){
	$('#content').css('opacity','0');
	//Increment the idle time counter every minute.
	var idleInterval = setInterval("timerIncrement()", 30000); // 30 seconds
	//Zero the idle timer on mouse movement.
	$(this).mousemove(function (e) {
	        idleTime = 0;
	});
	$(document).bind("dragstart", function() {
	     return false;
	});
	
	$(body).css({
	           'cursor' : 'none'
	        });
	cycle();
	
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
	
	

	cycle();
 });

$(window).load(function() {
		$('.alpha li').addClass('passiveAlpha');
			jmax = $("ul.alpha li").length -1;
	//	$('#content').css('opacity','0');
});





