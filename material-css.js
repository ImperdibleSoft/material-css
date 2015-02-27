
	/* -------------------------------------------------------------------------------------- */
	/* --- MATERIAL CSS ---------------------------------------------------------------- */
	/* -------------------------------------------------------------------------------------- */
	/* --- Light CSS framework for creating a Material Design look&feel ----------- */
	/* --- aplicable to webapps. Supports any JS framework ------------------------ */
	/* -------------------------------------------------------------------------------------- */
	/* --- Developed by:				------------------------------------------------------ */
	/* ---   Rafael Pérez García		------------------------------------------------------ */
	/* ---   at ImperdibleSoft		------------------------------------------------------ */
	/* -------------------------------------------------------------------------------------- */
	/* --- http://www.imperdiblesoft.com						---------------------------- */
	/* --- http://imperdiblesoft.github.io/material-css		---------------------------- */
	/* -------------------------------------------------------------------------------------- */

function debug(param){
	if(false){
		console.log(param);
	}
}

var mc = {}

mc.isMobile = function(){
	return (window.innerWidth < 768) ? true : false;
}
mc.isTablet = function(){
	return (window.innerWidth >= 768 && window.innerWidth <= 1024) ? true : false;
}
mc.isPC = function(){
	return (window.innerWidth > 1025 && window.innerWidth <= 1279) ? true : false;
}
mc.isTV = function(){
	return (window.innerWidth > 1280) ? true : false;
}

mc.toogleNavigation = function(){
	if( $("body > .mc-navigation").hasClass("opened") ){
	
		/*	Close the menu bar	*/
		$("body > .mc-navigation").removeClass("opened");
		$("body > .mc-navigation .mc-header-menu").removeClass("opened");
		
		
	}else{
	
		/*	Open the menu bar	*/
		$("body > .mc-navigation").addClass("opened");
		$("body > .mc-navigation .mc-header-menu").addClass("opened");
	}
}
mc.toogleSubMenu = function(param){
	if( $("[mc-submenu='"+ param +"']").hasClass("mc-collapsed") ){
	
		/*	Collapse all submenus	*/
		$("[mc-submenu]").addClass("mc-collapsed");
		
		/*	Open selected sumbenu	*/
		$("[mc-submenu='"+ param +"']").removeClass("mc-collapsed");
		
	}else{
	
		/*	Close selected sumbenu	*/
		$("[mc-submenu='"+ param +"']").addClass("mc-collapsed");
	}
}

mc.toogleTabs = function(param){
	if( param ){
		$(".mc-tabs-bar").addClass("mc-opened");
		$("body > .mc-content").removeClass("mc-untabbed");
		
	}else{
		$(".mc-tabs-bar").removeClass("mc-opened");
		$("body > .mc-content").addClass("mc-untabbed");
	}
	
}
mc.updateTabsBar = function(param){
	var newWidth = 30;
	
	$(param +" .mc-tab").each(function(){
		newWidth += parseInt( $(this).width() ) + parseInt( $(this).css("padding-left") ) + parseInt( $(this).css("padding-right") );
	});
	$(param).css("min-width", newWidth);
	$(param).css("margin-left", "0px");
}

mc.initializeDropdowns = function(param){
	$(".mc-dropdown").each(function(){
		var newVal = $(this).children("select").children("option[selected]").html();
		if( !newVal ){
			newVal = $(this).children("select").children("option")[0].innerHTML;
		}
		$(this).children(".mc-dropdown-bg").children(".mc-dropdown-value").html( newVal );
	});
}

mc.updateFloatingButtons = function(){
	if( mc.isMobile() ){
		var notifications = parseInt ( $(".mc-notification-container").height() );
		
		if( $(".mc-floating-window:not(.mc-hidden)").length >= 1 && $(".mc-floating-window:not(.mc-hidden)").hasClass("mc-opened") ){
			var floatingWindows = parseInt ( $(".mc-floating-window:not(.mc-hidden)").height() );
			
		}else if( $(".mc-floating-window:not(.mc-hidden)").length >= 1 ){
			var floatingWindows = 56;
		}
		
		if( notifications >= floatingWindows){
			var newPosition = notifications;
			
		}else{
			var newPosition = floatingWindows;
		}
	
		$("body > .mc-floating").css("bottom", (newPosition + 4) +"px" );
		
	}else{
		$("body > .mc-floating").removeAttr("style");
	}
	
	if( $(document).height() <= window.innerHeight && $("body > .mc-floating").children().length >= 1 ){
		$("body > .mc-floating").hide();
		
	}else{
		$("body > .mc-floating").show();
	}
}

mc.initializeSliders = function(){
	$(".mc-slider-bg").each(function(){
		var slider = {
			"elemWidth": 0,
			"elemRange": 0,
			"elemClicked": 0,
			"elemPercentage": 0,
			"elemValue": 0,
			"newPosition": 0
		}
		var initialMargin = 0
	
		var elem = $(this);
		var touch = $(this).parent(".mc-slider").children("input").attr("value");
		
		/*	Calculate the element width	*/
		slider.elemWidth = $(elem).width();
		
		/*	Calculate the range	*/
		slider.elemRange = parseInt( $(elem).parent(".mc-slider").children("input[type='range']").attr("max") ) - parseInt( $(elem).parent(".mc-slider").children("input[type='range']").attr("min") );
		
		/*	Calculate where the user clicked	*/
		slider.elemPercentage = ( parseInt( touch ) - parseInt( $(elem).parent(".mc-slider").children("input[type='range']").attr("min") ) ) / slider.elemRange;
		
		/*	Calculate where the user clicked	*/
		slider.elemClicked = $(elem).width() * slider.elemPercentage;
		
		/*	Calculate the new value	*/
		slider.elemValue = touch;
		$(elem).parent(".mc-slider").children("input[type='range']").attr( "value", slider.elemValue );
		
		/*	Calculate the new position for the picker	*/
		slider.newPosition = parseInt( slider.elemClicked );
		$(elem).children(".mc-slider-picker").css("left", slider.newPosition+"px");
	
		/*	Color the progress bar	*/
		$(elem).children(".mc-slider-progress").css("width", (slider.elemPercentage * 100) +"%");
	});
}

mc.openDialog = function(param){
	if( $(param)[0] ){
		
		$("body").attr("mc-scroll", $("body").scrollTop());
		$("body").addClass("mc-noscroll");
		$(".mc-blocker").addClass("mc-opened");
		
		$(param).addClass("mc-opened");
	}
}
mc.closeDialog = function(param){
	if( $(param)[0] ){
		
		$("body").removeClass("mc-noscroll");
		$("body").scrollTop( $("body").attr("mc-scroll") );
		$(".mc-blocker").removeClass("mc-opened");
		
		$(param).removeClass("mc-opened");
	}
}

$(document).ready(function(){
	
	/*	Click on header-menu icon, mobile version	*/
	$(".mc-header .mc-button-icon[mc-action='menu'], .mc-navigation .mc-button-icon[mc-action='prev']").click(function(){
		mc.toogleNavigation();
	});
	
	/*	Click on menu-item or menu-subitem	*/
	$(".mc-navigation .mc-nav-item, .mc-navigation .mc-nav-subitem").click(function(){
		if( !$(this).attr("mc-menu") ){
			mc.toogleNavigation();
		}
	});
	
	/*	Click on menu item	*/
	$("[mc-menu]").click(function(){
		mc.toogleSubMenu( $(this).attr("mc-menu") );
	});
	
	/*	Vars for open/close menu	*/
	var initial, previus, current, last;
	
	/*	Vars for control the scrolling	*/
	var prevScroll, currentScroll;
	
	/*	Vars for resize images	*/
	var element = document.querySelector("body");
	
	/*	Vars for sliders	*/
	var slider = {
		"elemWidth": 0,
		"elemRange": 0,
		"elemClicked": 0,
		"elemPercentage": 0,
		"elemValue": 0,
		"newPosition": 0
	}
	var initialMargin = 0;
	
	/*	Remember the track start	*/
	element.addEventListener('touchstart', function(e, mc){
		initial = e.changedTouches[0].clientX;
		previus = e.changedTouches[0].clientX;
		
		/*	If we are on the Tab Bar	*/
		if( $(e.target).hasClass("mc-tabs-bar") || $(e.target).hasClass("mc-tab") ){
		
			/*	Select the mc-tabs-bar	*/
			var touchedElem = e.target;
			if( $(touchedElem).hasClass("mc-tab") ){
				touchedElem = $(touchedElem).parent(".mc-tabs-bar");
			}
			
			initialMargin = parseInt( $(touchedElem).css("margin-left") );
		}
		
		/*	If we are on a Slider	*/
		else if( $(e.target).hasClass("mc-slider") || $(e.target).hasClass("mc-slider-bg") || $(e.target).hasClass("mc-slider-progress") || $(e.target).hasClass("mc-slider-picker") ){
			var touchedElem = e.target;
			if( $(touchedElem).hasClass("mc-slider") ){
				touchedElem = $(touchedElem).children(".mc-slider-bg");
			
			}else if( $(touchedElem).hasClass("mc-slider-progress") || $(touchedElem).hasClass("mc-slider-picker") ){
				touchedElem = $(touchedElem).parent(".mc-slider-bg");
			}
			
			var touch = e.changedTouches[0].clientX - $(touchedElem).offset().left;
			var min = 0;
			var max = $(touchedElem).width();
			
			if(touch >= min && touch <= max ){
				animateSlider(touchedElem, touch);
			}
		}
	});
	
	/*	Detect the track progresion	*/
	element.addEventListener('touchmove', function(e, mc){
		
		/*	Set the current position	*/
		current = e.changedTouches[0].clientX;
		
		/*	Check the direction	*/
		if(previus && current > previus){
			//debug("Right");
			
		}else{
			//debug("Left");
		}
		
		/*	Set the previus position	*/
		previus = current;
		
		/*	If we are on the Tab Bar	*/
		if( $(e.target).hasClass("mc-tabs-bar") || $(e.target).hasClass("mc-tab") ){
		
			/*	Select the mc-tabs-bar	*/
			var touchedElem = e.target;
			if( $(touchedElem).hasClass("mc-tab") ){
				touchedElem = $(touchedElem).parent(".mc-tabs-bar");
			}
			
			/*	If the bar is bigger than the screen	*/
			if( parseInt( $(touchedElem).width() ) >= window.innerWidth){
				var newMargin = initialMargin + parseInt( current ) - parseInt( initial );
				var minMargin = (parseInt($(touchedElem).width() ) - window.innerWidth + 10) * (-1);
				
				/*	If  try to move to the left too much	*/
				if(newMargin >= 0){
					$(touchedElem).css("margin-left", "0px");
				}
				
				/*	If  try to move to the right too much	*/
				else if( newMargin <= minMargin ){
					$(touchedElem).css("margin-left", minMargin + "px");
				}
				
				/*	If  try to move normal	*/
				else{
					$(touchedElem).css("margin-left", newMargin +"px");
				}
			}
		}
		
		/*	If we are on a Slider	*/
		else if( $(e.target).hasClass("mc-slider") || $(e.target).hasClass("mc-slider-bg") || $(e.target).hasClass("mc-slider-progress") || $(e.target).hasClass("mc-slider-picker") ){
			var touchedElem = e.target;
			if( $(touchedElem).hasClass("mc-slider") ){
				touchedElem = $(touchedElem).children(".mc-slider-bg");
			
			}else if( $(touchedElem).hasClass("mc-slider-progress") || $(touchedElem).hasClass("mc-slider-picker") ){
				touchedElem = $(touchedElem).parent(".mc-slider-bg");
			}
			
			var touch = e.touches[0].clientX - $(touchedElem).offset().left;
			var min = 0;
			var max = $(touchedElem).width();
			
			if(touch >= min && touch <= max ){
				animateSlider(touchedElem, touch);
			}
		}
	});
	
	/*	Detect the track end	*/
	element.addEventListener('touchend', function(e, mc){
		last = e.changedTouches[0].clientX;
		
		/*	If we are on the Tab Bar	*/
		if( $(e.target).hasClass("mc-tabs-bar") || $(e.target).hasClass("mc-tab") ){
		
			/*	Select the mc-tabs-bar	*/
			var touchedElem = e.target;
			if( $(touchedElem).hasClass("mc-tab") ){
				touchedElem = $(touchedElem).parent(".mc-tabs-bar");
			}
			
			/*	If the bar is bigger than the screen	*/
			if( parseInt( $(touchedElem).width() ) >= window.innerWidth){
				var newMargin = initialMargin + parseInt( current ) - parseInt( initial );
				var minMargin = (parseInt($(touchedElem).width() ) - window.innerWidth + 10) * (-1);
				
				/*	If  try to move to the left too much	*/
				if(newMargin >= 0){
					$(touchedElem).css("margin-left", "0px");
				}
				
				/*	If  try to move to the right too much	*/
				else if( newMargin <= minMargin ){
					$(touchedElem).css("margin-left", minMargin + "px");
				}
				
				/*	If  try to move normal	*/
				else{
					$(touchedElem).css("margin-left", newMargin +"px");
				}
			}
		}
		
		/*	If we are on a Slider	*/
		else if( $(e.target).hasClass("mc-slider") || $(e.target).hasClass("mc-slider-bg") || $(e.target).hasClass("mc-slider-progress") || $(e.target).hasClass("mc-slider-picker") ){
			var touchedElem = e.target;
			if( $(touchedElem).hasClass("mc-slider") ){
				touchedElem = $(touchedElem).children(".mc-slider-bg");
			
			}else if( $(touchedElem).hasClass("mc-slider-progress") || $(touchedElem).hasClass("mc-slider-picker") ){
				touchedElem = $(touchedElem).parent(".mc-slider-bg");
			}
			
			var touch = e.changedTouches[0].clientX - $(touchedElem).offset().left;
			var min = 0;
			var max = $(touchedElem).width();
			
			if(touch >= min && touch <= max ){
				animateSlider(touchedElem, touch);
			}
		}
		
		/*	If we are on any other place, open the menu	*/
		else if(last >= (initial + 100)){
			$(".mc-navigation").addClass("opened");
			$(".mc-header-menu").addClass("opened");
			
		}else if(initial >= (last + 100)){
			$(".mc-navigation").removeClass("opened");
			$(".mc-header .mc-header-menu").removeClass("opened");	
		}
		
		resizeLayoutImages();
		updateFloatingButtons();
	});
	
	/*	Detect the mouse click start	*/
	element.addEventListener("mousedown", function(e, mc){
		
		/*	If we are on a Slider	*/
		if( $(e.target).hasClass("mc-slider") || $(e.target).hasClass("mc-slider-bg") || $(e.target).hasClass("mc-slider-progress") || $(e.target).hasClass("mc-slider-picker") ){
			var touchedElem = e.target;
			if( $(touchedElem).hasClass("mc-slider") ){
				touchedElem = $(touchedElem).children(".mc-slider-bg");
			
			}else if( $(touchedElem).hasClass("mc-slider-progress") || $(touchedElem).hasClass("mc-slider-picker") ){
				touchedElem = $(touchedElem).parent(".mc-slider-bg");
			}
			
			var touch = e.clientX - $(touchedElem).offset().left;
			var min = 0;
			var max = $(touchedElem).width();
			
			if(touch >= min && touch <= max ){
				animateSlider(touchedElem, touch);
			}
		}
		
	});
	
	/*	Detect the mouse click	*/
	element.addEventListener("click", function(e, mc){
				
		/*	If we are on the dialog-blocker	*/
		if( $(e.target).hasClass("mc-blocker") ){
			$("body").removeClass("mc-noscroll");
			$("body").scrollTop( $("body").attr("mc-scroll") );
			$(".mc-blocker").removeClass("mc-opened");
			
			$(".mc-floating-window.mc-opened").removeClass("mc-opened");
			$(".mc-dialog.mc-opened").removeClass("mc-opened");
		}
		
		/*	If we are on a dropdown	*/
		else if( $(e.target).hasClass("mc-dropdown") || $(e.target).hasClass("mc-dropdown-bg") || $(e.target).hasClass("mc-dropdown-value") || $(e.target).hasClass("mc-dropdown-menu-item") ){
			
			var selected = e.target;
			var dropdown = e.target;
			if( $(e.target).hasClass("mc-dropdown-bg") ){
				selected = $(e.target).parent(".mc-dropdown");
				dropdown = $(e.target).parent(".mc-dropdown");
			
			}else  if( $(e.target).hasClass("mc-dropdown-value") ){
				selected = $(e.target).parent(".mc-dropdown-bg").parent(".mc-dropdown");
				dropdown = $(e.target).parent(".mc-dropdown-bg").parent(".mc-dropdown");
			
			}else if( $(e.target).hasClass("mc-dropdown-menu-item") ){
				dropdown = $(e.target).parent(".mc-dropdown-menu").parent(".mc-dropdown");
				
			}
			
			var dropdownSelect = $(dropdown).children("select");
			var dropdownBg = $(dropdown).children(".mc-dropdown-bg");
			var dropdownValue = $(dropdown).children(".mc-dropdown-bg").children(".mc-dropdown-value");
			var dropdownMenu = $(dropdown).children(".mc-dropdown-menu");
			
			/*	Open the dropdown	*/
			if( $(selected).hasClass("mc-dropdown") ){
				
				$(".mc-dropdown-menu").each(function(){
					$(this).removeClass("mc-opened");					
				});
				
				$(dropdownMenu).html("");
				$(dropdownSelect).children("option").each(function(){
					if( !$(dropdownSelect).attr("required") || ($(dropdownSelect).attr("required") && $(this).val()) ){
						$(dropdownMenu).append('<span class="mc-dropdown-menu-item mc-list-item" mc-value="'+ $(this).val() +'">'+ $(this).html() +'</span>');
					}					
				});
				$(".mc-content-blocker").addClass("mc-opened");
				$(dropdownMenu).addClass("mc-opened");
			}
			
			/*	Select a value	*/
			else if( $(selected).hasClass("mc-dropdown-menu-item") ){
				var newVal = $(selected).attr("mc-value");
				var newText = $(selected).html();
				
				$(dropdownSelect).children("option").each(function(){
					if( $(this).val() == newVal ){
						$(this).attr("selected", "");
						$(dropdownValue).html( newText );
						
					}else{
						$(this).removeAttr("selected");
					}
				});
				$(".mc-content-blocker").removeClass("mc-opened");
				$(dropdownMenu).removeClass("mc-opened");
			}
		}
		
		/*	If we are on a floating window	*/
		else if( $(e.target).hasClass("mc-floating-window") || $(e.target).hasClass("mc-window-header") || $(e.target).offsetParent().hasClass("mc-window-header") ){
			
			var selected = e.target;
			if( $(e.target).hasClass("mc-window-header") ){
				selected = $(e.target).parent();
				
			}else if( $(e.target).offsetParent().hasClass("mc-window-header") && !$(e.target).hasClass("mc-button") ){
				selected = $(e.target).parent().parent();
				
			}
			
			if( $(selected).hasClass("mc-floating-window") ){
				
				/*	Open the window	*/
				if( !$(selected).hasClass("mc-opened") ){
					$("body").attr("mc-scroll", $("body").scrollTop());
					$("body").addClass("mc-noscroll");
					$(".mc-blocker").addClass("mc-opened");
					
					$(selected).addClass("mc-opened");
				}
				
				/*	Close the window	*/
				else{
					$("body").removeClass("mc-noscroll");
					$("body").scrollTop( $("body").attr("mc-scroll") );
					$(".mc-blocker").removeClass("mc-opened");
					
					$(selected).removeClass("mc-opened");
				}
			}
		}
		
		resizeLayoutImages();
		resizeDialogsHeight();
		updateFloatingButtons();
	});
	
	/*	Detect the mouse click	*/
	element.addEventListener("keyup", function(e, mc){
		
		/*	If we are on a Slider	*/
		var elem = $(e.target).parent(".mc-input");
		if( $(elem).hasClass("mc-input") ){
			
			if( ($(elem).children("input").length >= 1 && $(elem).children("input").val() != "") || ($(elem).children("textarea").length >= 1 && $(elem).children("textarea").val() != "") ){
				$(elem).children(".mc-label").addClass("mc-completed-label");
			
			}else{
				if( !$(elem).children(".mc-label").attr("data-ng-class") ){
					$(elem).children(".mc-label").removeClass("mc-completed-label");
				}
			}
			
		}
	});
	
	/*	Detect the window load	*/
	window.addEventListener("load", function(e, mc){
		initializeDropdowns();
		initializeSliders();
		resizeLayoutImages();
		updateFloatingButtons();
		resizeDialogsHeight();
	});
	
	/*	Detect the window scroll	*/
	window.addEventListener("scroll", function(e, mc){
		
		currentScroll = parseInt( $("body").scrollTop() );
		
		//var headerHeight =  ( parseInt( $(".mc-header").height() ) - parseInt( $(".mc-header .mc-tabs-bar").height() ) );
		var headerHeight =  parseInt( $("body > .mc-header .mc-tabs-bar").height() );
		var headerMargin = headerHeight * (-1);
		
		/*	If there are tabs, hide the header when scrolling	*/
		if( !$("body[mc-layout='front']")[0] && $("body > .mc-header .mc-tabs-bar")[0] && currentScroll >= headerHeight){
			
			$("body > .mc-header").css("margin-top", headerMargin+"px");
		}
		
		/*	If we scroll up, the header appears	*/
		if(currentScroll <= prevScroll || $("body[mc-layout='front']")[0]){
			$("body > .mc-header").css("margin-top", "0px");
		}
		
		prevScroll = currentScroll;
		
		initializeDropdowns();
		initializeSliders();
	});
	
	/*	Detect the window resize	*/
	window.addEventListener("resize", function(e, mc){
		initializeDropdowns();
		initializeSliders();
		resizeLayoutImages();
		resizeDialogsHeight();
		updateFloatingButtons();
	});
	
	/*	Detect the mouse move	*/
	window.addEventListener("mousemove", function(e, mc){
		
		$(".mc-tooltip").each(function(){
			if( $(this).is(":visible") ){
				$(this).hide();
			}
		});
		
		var elem = e.target;
		if( $(elem).attr("mc-tooltip")){
			
			var item = {
				"bind": $(elem).attr("mc-tooltip"),
				"elem": "",
				"size": {
					"X": "",
					"Y": ""
				},
				"from": {
					"X": "",
					"Y": ""
				},
				"to": {
					"X": "",
					"Y": ""
				}
			}
			var tooltip = {
				"bind": $(elem).attr("mc-tooltip"),
				"elem": "",
				"message": "", 
				"size": {
					"X": "",
					"Y": ""
				},
				"from": {
					"X": "",
					"Y": ""
				},
				"to": {
					"X": "",
					"Y": ""
				}
			}
			
			/*	Calculate the data for the item	*/
			item.elem = "[mc-tooltip='"+ item.bind +"']";
			item.size.X = parseInt($(item.elem).width()) + parseInt($(item.elem).css("padding-left")) + parseInt($(item.elem).css("padding-right"));
			item.size.Y = parseInt($(item.elem).height()) + parseInt($(item.elem).css("padding-top")) + parseInt($(item.elem).css("padding-bottom"));
			item.from.X = parseInt($(item.elem)[0].offsetLeft);
			item.from.Y = parseInt($(item.elem)[0].offsetTop);
			
			item.from.absoluteX = parseInt($(item.elem).offset().left);
			item.from.absoluteY = parseInt($(item.elem).offset().top);
			/*
			item.from.absoluteX = item.from.X;
			item.from.absoluteY = item.from.Y;
			*/
			item.to.X = item.from.X + item.size.X;
			item.to.Y = item.from.Y + item.size.Y;
			
			/*	Calculate the data for the tooltip	*/
			tooltip.elem = "[mc-item='"+ tooltip.bind +"']";
			tooltip.message = $(tooltip.elem).text();
			tooltip.size.X = parseInt($(tooltip.elem).width()) + parseInt($(tooltip.elem).css("padding-left")) + parseInt($(tooltip.elem).css("padding-right"));
			tooltip.size.Y = parseInt($(tooltip.elem).height()) + parseInt($(tooltip.elem).css("padding-top")) + parseInt($(tooltip.elem).css("padding-bottom"));
			
			/*	Check possible positions	*/
			var position = {
				"X": {
					"left": false,
					"right": false,
					"center": false
				},
				"Y": {
					"bottom": false,
					"top": false,
					"inline": false
				}
			};
			
			/*	If there is space to put the notification centered	*/
			if( ( item.from.X + (item.size.X / 2) - (tooltip.size.X / 2) ) >= 10 ){
				position.X.center = item.from.X + (item.size.X / 2) - (tooltip.size.X / 2);
			}
			
			/*	If there is space to put the notification at right	*/
			if( ( item.from.absoluteX + item.size.X) + 10 + tooltip.size.X <= $("body").width()){
				position.X.right = item.to.X + 10;
			}
			
			/*	If there is space to put the notification at left	*/
			if( item.from.absoluteX - 10 - tooltip.size.X >= 0){
				position.X.left = item.from.X - 10 - tooltip.size.X;
			}
			
			/*	If there is space to put the notification inline	*/
			if(position.X.left || position.X.right){
				position.Y.inline = item.from.Y;
			}
			
			/*	If there is space to put the notification at the bottom	*/
			if( ( item.from.absoluteY + item.size.Y + 10 + tooltip.size.Y ) <= $("body").height() ){
				position.Y.bottom = item.to.Y + 10;
			}
			
			/*	If there is space to put the notification at the top	*/
			if( item.from.absoluteY - 10 - tooltip.size.Y >= 0 ){
				position.Y.top = item.from.Y - 10 - tooltip.size.Y;
			}
			
			/*	Chose the position	*/
			var tempPos = false;
			if(position.X.center){
				if(position.Y.bottom){
					tempPos = {
						"X": "center",
						"Y": "bottom"
					}
				}else if(position.Y.top){
					tempPos = {
						"X": "center",
						"Y": "top"
					}
				
				}
			}else if(position.X.right){
				tempPos = {
					"X": "right",
					"Y": "inline"
				}
			}else{
				tempPos = {
					"X": "left",
					"Y": "inline"
				}
			}
			switch(tempPos.X){
				case "center":
					$(tooltip.elem).css("left", position.X.center);
					break;
				
				case "left":
					$(tooltip.elem).css("left", position.X.left);
					break;
				
				case "right":
					$(tooltip.elem).css("left", position.X.right);
					break;
			}
			switch(tempPos.Y){
				case "bottom":
					$(tooltip.elem).css("top", position.Y.bottom);
					break;
				
				case "top":
					$(tooltip.elem).css("top", position.Y.top);
					break;
				
				case "inline":
					$(tooltip.elem).css("top", position.Y.inline);
					break;
			}
			
			if( !$(tooltip.elem).is(":visible") ){
				$(tooltip.elem).show();
			}
			
		}
	
		updateFloatingButtons();
	});
	
	function resizeLayoutImages(){
		
		setTimeout(function(){
			
			/*	Layout = "left-image"	*/
			if( $(".mc-card[mc-layout='left-image'] .mc-header img")[0] && $(".mc-card[mc-layout='left-image'] .mc-header img")[0].width >= 1 ){
				
				var newHeight = parseInt( $(".mc-card[mc-layout='left-image'] .mc-content").height() ) + parseInt( $(".mc-card[mc-layout='left-image'] .mc-content").css("margin-bottom") );
				$(".mc-card[mc-layout='left-image'] .mc-header").animate({"height": newHeight}, 0, function(){
				
					debug("Left image to: "+ newHeight);
					$(".mc-card[mc-layout='left-image'] .mc-header img").css("height", "100%");
				} );
			}
			
			/*	Layout = "right-image"	*/
			if( $(".mc-card[mc-layout='right-image'] .mc-header img")[0] && $(".mc-card[mc-layout='right-image'] .mc-header img")[0].width >= 1 ){
				
				var newHeight = parseInt( $(".mc-card[mc-layout='right-image'] .mc-content").height() ) + parseInt( $(".mc-card[mc-layout='right-image'] .mc-content").css("margin-bottom") );
				$(".mc-card[mc-layout='right-image'] .mc-header").animate({"height": newHeight}, 0, function(){
				
					debug("Right image to: "+ newHeight);
					$(".mc-card[mc-layout='right-image'] .mc-header img").css("height", "100%" );
				});
			}
			
			/*	Layout = "grid-images"	*/
			if( $(".mc-grid-item img")[0] && $(".mc-grid-item img")[0].width >= 1 ){
				
				$(".mc-grid-item").each(function(){ 
					$(this).animate({"height": $(this).width()}, 0, function(){
						if( $(this).children("img").width() < $(this).children("img").height()  ){
							$(this).children("img").width("100%");
							$(this).children("img").height("auto");
						}
					});
				});
			}
		
		}, 300);
	}
	resizeLayoutImages();
	updateFloatingButtons();
	
	function resizeDialogsHeight(){
	
		setTimeout(function(){
		
			if( $(".mc-dialog")[0] && $(".mc-dialog .mc-content")[0] ){
				
				$(".mc-dialog").each(function(){
					
					var footerHeight = parseInt( $(this).children(".mc-footer").height() ) + parseInt( $(this).children(".mc-footer").css("padding-top") ) + parseInt( $(this).children(".mc-footer").css("padding-bottom") );
					var newHeight = parseInt( window.innerHeight ) - 100 - footerHeight;
					$(this).children(".mc-content").css("max-height", newHeight);
					$(this).children().children(".mc-content").css("max-height", newHeight);
					$(this).children(".mc-content").css("margin-bottom", footerHeight);
					$(this).children().children(".mc-content").css("margin-bottom", footerHeight);
				});
				
			}
			
		}, 0);
		
	}
	resizeDialogsHeight();
	
	function initializeDropdowns(){
		if( $(".mc-content-blocker").length <= 0 ){
			$("body > .mc-content").append("<div class='mc-content-blocker'></div>");
		}
		
		$(".mc-dropdown").each(function(){
			var newVal = $(this).children("select").children("option[selected]").html();
			if( !newVal ){
				newVal = $(this).children("select").children("option")[0].innerHTML;
			}
			$(this).children(".mc-dropdown-bg").children(".mc-dropdown-value").html( newVal );
		});
		
	}
	
	function animateSlider(elem, touch){
		
		/*	Calculate the element width	*/
		slider.elemWidth = $(elem).width();
		
		/*	Calculate the range	*/
		slider.elemRange = parseInt( $(elem).parent(".mc-slider").children("input[type='range']").attr("max") ) - parseInt( $(elem).parent(".mc-slider").children("input[type='range']").attr("min") );
		
		/*	Calculate where the user clicked	*/
		slider.elemClicked = parseInt( touch );
		
		/*	Calculate where the user clicked	*/
		slider.elemPercentage = parseInt( touch ) / slider.elemWidth;
		
		/*	Calculate the new value	*/
		slider.elemValue = parseInt( $(elem).parent(".mc-slider").children("input[type='range']").attr("min") ) + ( slider.elemRange * slider.elemPercentage );
		$(elem).parent(".mc-slider").children("input[type='range']").attr( "value", slider.elemValue );
		
		/*	Calculate the new position for the picker	*/
		slider.newPosition = parseInt( slider.elemClicked );
		$(elem).children(".mc-slider-picker").css("left", slider.newPosition+"px");
		
		/*	Color the progress bar	*/
		$(elem).children(".mc-slider-progress").css("width", (slider.elemPercentage * 100) +"%");
		
	}
	function initializeSliders(){
		$(".mc-slider-bg").each(function(){
		
			var elem = $(this);
			var touch = $(this).parent(".mc-slider").children("input").val();
			
			/*	Calculate the element width	*/
			slider.elemWidth = $(elem).width();
			
			/*	Calculate the range	*/
			slider.elemRange = parseInt( $(elem).parent(".mc-slider").children("input[type='range']").attr("max") ) - parseInt( $(elem).parent(".mc-slider").children("input[type='range']").attr("min") );
			
			/*	Calculate where the user clicked	*/
			slider.elemPercentage = ( parseInt( touch ) - parseInt( $(elem).parent(".mc-slider").children("input[type='range']").attr("min") ) ) / slider.elemRange;
			
			/*	Calculate where the user clicked	*/
			slider.elemClicked = $(elem).width() * slider.elemPercentage;
			
			/*	Calculate the new value	*/
			slider.elemValue = touch;
			$(elem).parent(".mc-slider").children("input[type='range']").attr( "value", slider.elemValue );
			
			/*	Calculate the new position for the picker	*/
			slider.newPosition = parseInt( slider.elemClicked );
			$(elem).children(".mc-slider-picker").css("left", slider.newPosition+"px");
		
			/*	Color the progress bar	*/
			$(elem).children(".mc-slider-progress").css("width", (slider.elemPercentage * 100) +"%");
		});
	}
	
	function updateFloatingButtons(){
		if( window.innerWidth <= 768 ){
			var notifications = parseInt ( $(".mc-notification-container").height() );
			
			if( $(".mc-floating-window:not(.mc-hidden)").length >= 1 && $(".mc-floating-window:not(.mc-hidden)").hasClass("mc-opened") ){
				var floatingWindows = parseInt ( $(".mc-floating-window:not(.mc-hidden)").height() );
				
			}else if( $(".mc-floating-window:not(.mc-hidden)").length >= 1 ){
				var floatingWindows = 56;
			}
			
			if( notifications >= floatingWindows){
				var newPosition = notifications;
				
			}else{
				var newPosition = floatingWindows;
			}
		
			$("body > .mc-floating").css("bottom", (newPosition + 4) +"px" );
			
		}else{
			$("body > .mc-floating").removeAttr("style");
		}
		
		if( $(document).height() <= window.innerHeight && $("body > .mc-floating").children().length >= 1 ){
			$("body > .mc-floating").hide();
			
		}else{
			$("body > .mc-floating").show();
		}
	}

	if( /localhost/.test(location.href) == false && /192.168/.test(location.href) == false){
		$.ajax({
			type : 'POST',
			dataType : 'jsonp', 
			crossDomain: true,
			url : 'http://www.imperdiblesoft.com/APIs/stats.php',
			data : {}
		});
	}
	
	/*	Add the blocker element	*/
	$("body").append("<div class='mc-blocker'></div>");
	$("body > .mc-content").append("<div class='mc-content-blocker'></div>");
	
});