materialCSS.controller('commonController', function($scope, $location, $routeParams){
	
	/*	Start the controller functions	*/
	
	/*	Product Version	*/
	$scope.versions = {
		"stable": "0.4",
		"beta": "0.4b",
		"nightly": "0.4n"
	};
	
	/*	Write the Section on the title bar	*/
	$scope.section = $location.path();
	$scope.section = $scope.section.replace("/", "");
	$scope.section = $scope.section.replace("-", " ");
	
	if( location.hash == "#/" ){
		$("body > .mc-header .mc-title").html( "Home" );
		$("body").attr( "mc-layout", "front" );
		$(".mc-navigation").removeClass("opened");
		$(".mc-navigation .mc-header-menu").removeClass("opened");
		$("body > .mc-header").append("<img id='headerImage' src='images/material-03.jpg' />");
		
	}else{
		$("#headerImage").remove();
    $("body > .mc-header").removeAttr("style");
		$("body > .mc-header .mc-title").html( $scope.section );
		$("body").attr( "mc-layout", "" );
	}
	
	/*	Scroll to the section specified in the url	*/
	setTimeout(function(){
		var pos = 0;
		for(var x in $routeParams){
			pos = $("[alt='"+ x +"']").offset().top;
			pos = pos - 57;
		}
	
		$("body").animate({'scrollTop': pos});
		$("body").animate({'scrollTop': pos + 1});
	}, 350);
	
	/*	Remove the second line	*/
	$("#properties").remove();
	
	/*	Open tabs bar	*/
	if( /\/texts/.test(location.hash) ){
		$(".mc-tabs-bar").html('');
		$(".mc-tabs-bar").append('<a href="#/texts?titles" class="mc-tab" mc-section="titles">Titles</a>');
		$(".mc-tabs-bar").append('<a href="#/texts?subtitles" class="mc-tab" mc-section="subtitles">Subtitles</a>');
		$(".mc-tabs-bar").append('<a href="#/texts?normal" class="mc-tab" mc-section="normal">Normal text</a>');
		$(".mc-tabs-bar").append('<a href="#/texts?notes" class="mc-tab" mc-section="notes">Notes</a>');
		$(".mc-tabs-bar").append('<a href="#/texts?others" class="mc-tab" mc-section="others">Others</a>');
		
		mc.updateTabsBar(".mc-tabs-bar");
		mc.toogleTabs(true);
		
	}else if( /\/colors/.test(location.hash) ){
		$(".mc-tabs-bar").html('');
		$(".mc-tabs-bar").append('<a href="#/colors?main-color" class="mc-tab" mc-section="main-color">Main Color</a>');
		$(".mc-tabs-bar").append('<a href="#/colors?bg-color" class="mc-tab" mc-section="bg-color">BG. Color</a>');
		$(".mc-tabs-bar").append('<a href="#/colors?color-palette" class="mc-tab" mc-section="color-palette">Color Palette</a>');
		$(".mc-tabs-bar").append('<a href="#/colors?special-colors" class="mc-tab" mc-section="special-colors">Special Colors</a>');
		
		mc.updateTabsBar(".mc-tabs-bar");
		mc.toogleTabs(true);
		
	}else if( /\/icons/.test(location.hash) ){
		$(".mc-tabs-bar").html('');
		
		mc.toogleTabs(false);
		
	}else if( /\/navigation/.test(location.hash) ){
		$(".mc-tabs-bar").html('');
		$(".mc-tabs-bar").append('<a href="#/navigation?nav-title" class="mc-tab" mc-section="nav-title">Nav. Title</a>');
		$(".mc-tabs-bar").append('<a href="#/navigation?account-info" class="mc-tab" mc-section="account-info">Account Info</a>');
		$(".mc-tabs-bar").append('<a href="#/navigation?nav-items" class="mc-tab" mc-section="nav-items">Nav. Items</a>');
		$(".mc-tabs-bar").append('<a href="#/navigation?nav-subitems" class="mc-tab" mc-section="nav-subitems">Nav. Subitems</a>');
		$(".mc-tabs-bar").append('<a href="#/navigation?collapsable-subitems" class="mc-tab" mc-section="collapsable-subitems">Collapsable subitems</a>');
		
		mc.updateTabsBar(".mc-tabs-bar");
		mc.toogleTabs(true);
		
	}else if( /\/header/.test(location.hash) ){
		$(".mc-tabs-bar").html('');
		$(".mc-tabs-bar").append('<a href="#/header?header-bar" class="mc-tab" mc-section="header-bar">Header Bar</a>');
		$(".mc-tabs-bar").append('<a href="#/header?header-content" class="mc-tab" mc-section="header-content">Header Content</a>');
		$(".mc-tabs-bar").append('<a href="#/header?tabs" class="mc-tab" mc-section="tabs">Tabs</a>');
		
		mc.updateTabsBar(".mc-tabs-bar");
		mc.toogleTabs(true);
		
	}else if( /\/layouts/.test(location.hash) ){
		$(".mc-tabs-bar").html('');
		$(".mc-tabs-bar").append('<a href="#/layouts?no-layout" class="mc-tab" mc-section="no-layout">No layout</a>');
		$(".mc-tabs-bar").append('<a href="#/layouts?1-column" class="mc-tab" mc-section="1-column">One column</a>');
		$(".mc-tabs-bar").append('<a href="#/layouts?2-column" class="mc-tab" mc-section="2-column">Two columns</a>');
		$(".mc-tabs-bar").append('<a href="#/layouts?3-column" class="mc-tab" mc-section="3-column">Three columns</a>');
		$(".mc-tabs-bar").append('<a href="#/layouts?front-page" class="mc-tab" mc-section="front-page">Front page</a>');
		$(".mc-tabs-bar").append('<a href="#/layouts?hidden-nav" class="mc-tab" mc-section="hidden-nav">Hidden Nav</a>');
		$(".mc-tabs-bar").append('<a href="#/layouts?no-nav" class="mc-tab" mc-section="no-nav">No Navigation</a>');
		
		mc.updateTabsBar(".mc-tabs-bar");
		mc.toogleTabs(true);
		
	}else if( /\/buttons/.test(location.hash) ){
		$(".mc-tabs-bar").html('');
		$(".mc-tabs-bar").append('<a href="#/buttons?icon-buttons" class="mc-tab" mc-section="icon-buttons">Icon Buttons</a>');
		$(".mc-tabs-bar").append('<a href="#/buttons?text-buttons" class="mc-tab" mc-section="text-buttons">Text Buttons</a>');
		$(".mc-tabs-bar").append('<a href="#/buttons?comb-buttons" class="mc-tab" mc-section="comb-buttons">Comb. Buttons</a>');
		$(".mc-tabs-bar").append('<a href="#/buttons?float-buttons" class="mc-tab" mc-section="float-buttons">Float. Buttons</a>');
		$(".mc-tabs-bar").append('<a href="#/buttons?button-effects" class="mc-tab" mc-section="button-effects">Button Effects</a>');
		$(".mc-tabs-bar").append('<a href="#/buttons?button-shadow" class="mc-tab" mc-section="button-shadow">Button Shadow</a>');
		
		mc.updateTabsBar(".mc-tabs-bar");
		mc.toogleTabs(true);
		
	}else if( /\/lists/.test(location.hash) ){
		$(".mc-tabs-bar").html('');
		$(".mc-tabs-bar").append('<a href="#/lists?normal-list" class="mc-tab" mc-section="normal-list">Normal list</a>');
		$(".mc-tabs-bar").append('<a href="#/lists?clean-list" class="mc-tab" mc-section="clean-list">Clean list</a>');
		$(".mc-tabs-bar").append('<a href="#/lists?list-layout" class="mc-tab" mc-section="list-layout">List Layout</a>');
		$(".mc-tabs-bar").append('<a href="#/lists?autocomplete" class="mc-tab" mc-section="autocomplete">Autocomplete</a>');
		
		mc.updateTabsBar(".mc-tabs-bar");
		mc.toogleTabs(true);
		
	}else if( /\/cards/.test(location.hash) ){
		$(".mc-tabs-bar").html('');
		$(".mc-tabs-bar").append('<a href="#/cards?normal-cards" class="mc-tab" mc-section="normal-cards">Normal Cards</a>');
		$(".mc-tabs-bar").append('<a href="#/cards?with-buttons" class="mc-tab" mc-section="with-buttons">with Buttons</a>');
		$(".mc-tabs-bar").append('<a href="#/cards?post-cards" class="mc-tab" mc-section="post-cards">Post Cards</a>');
		$(".mc-tabs-bar").append('<a href="#/cards?with-header" class="mc-tab" mc-section="with-header">with Head. Images</a>');
		$(".mc-tabs-bar").append('<a href="#/cards?with-lateral" class="mc-tab" mc-section="with-lateral">with Lat. Images</a>');
		$(".mc-tabs-bar").append('<a href="#/cards?with-grid" class="mc-tab" mc-section="with-grid">with Grid of Images</a>');
		$(".mc-tabs-bar").append('<a href="#/cards?colored-cards" class="mc-tab" mc-section="colored-cards">Colored Cards</a>');
		
		mc.updateTabsBar(".mc-tabs-bar");
		mc.toogleTabs(true);
		
	}else if( /\/dialogs/.test(location.hash) ){
		$(".mc-tabs-bar").html('');
		$(".mc-tabs-bar").append('<a href="#/dialogs?common-dialog" class="mc-tab" mc-section="common-dialog">Common dialog</a>');
		$(".mc-tabs-bar").append('<a href="#/dialogs?falling-dialog" class="mc-tab" mc-section="falling-dialog">Falling dialog</a>');
		$(".mc-tabs-bar").append('<a href="#/dialogs?bottom-dialog" class="mc-tab" mc-section="bottom-dialog">Bottom dialog</a>');
		$(".mc-tabs-bar").append('<a href="#/dialogs?tooltips" class="mc-tab" mc-section="tooltips">Tooltips</a>');
		
		mc.updateTabsBar(".mc-tabs-bar");
		mc.toogleTabs(true);
		
	}else if( /\/notifications/.test(location.hash) ){
		$(".mc-tabs-bar").html('');
		$(".mc-tabs-bar").append('<a href="#/notifications?common-notification" class="mc-tab" mc-section="common-notification">Common Notification</a>');
		$(".mc-tabs-bar").append('<a href="#/notifications?notification-components" class="mc-tab" mc-section="notification-components">Notif. Components</a>');
		
		mc.updateTabsBar(".mc-tabs-bar");
		mc.toogleTabs(true);
		
	}else if( /\/tables/.test(location.hash) ){
		$(".mc-tabs-bar").html('');
		$(".mc-tabs-bar").append('<a href="#/tables?titles" class="mc-tab" mc-section="titles">Titles</a>');
		$(".mc-tabs-bar").append('<a href="#/tables?organization" class="mc-tab" mc-section="organization">Organization</a>');
		
		mc.updateTabsBar(".mc-tabs-bar");
		mc.toogleTabs(true);
		
	}else if( /\/forms/.test(location.hash) ){
		$(".mc-tabs-bar").html('');
		$(".mc-tabs-bar").append('<a href="#/forms?text-inputs" class="mc-tab" mc-section="text-inputs">Text inputs</a>');
		$(".mc-tabs-bar").append('<a href="#/forms?dropdowns" class="mc-tab" mc-section="dropdowns">Dropdowns</a>');
		$(".mc-tabs-bar").append('<a href="#/forms?radio-buttons" class="mc-tab" mc-section="radio-buttons">Radio Buttons</a>');
		$(".mc-tabs-bar").append('<a href="#/forms?checkboxes" class="mc-tab" mc-section="checkboxes">Checkboxes</a>');
		$(".mc-tabs-bar").append('<a href="#/forms?switchers" class="mc-tab" mc-section="switchers">Switchers</a>');
		$(".mc-tabs-bar").append('<a href="#/forms?sliders" class="mc-tab" mc-section="sliders">Sliders</a>');
		$(".mc-tabs-bar").append('<a href="#/forms?progress-bar" class="mc-tab" mc-section="progress-bar">Progress Bar</a>');
		$(".mc-tabs-bar").append('<a href="#/forms?spinners" class="mc-tab" mc-section="spinners">Spinners</a>');
		$(".mc-tabs-bar").append('<a href="#/forms?disabled" class="mc-tab" mc-section="disabled">Disabled</a>');
		
		mc.updateTabsBar(".mc-tabs-bar");
		mc.toogleTabs(true);
		
	}else if( /\/floating-windows/.test(location.hash) ){
		$(".mc-tabs-bar").html('');
		$(".mc-tabs-bar").append('<a href="#/floating-windows?common-windows" class="mc-tab" mc-section="common-windows">Common windows</a>');
		$(".mc-tabs-bar").append('<a href="#/floating-windows?chat-windows" class="mc-tab" mc-section="chat-windows">Chat windows</a>');
		$(".mc-tabs-bar").append('<a href="#/floating-windows?multimedia-windows" class="mc-tab" mc-section="multimedia-windows">Multimedia windows</a>');
		$(".mc-tabs-bar").append('<a href="#/floating-windows?share-windows" class="mc-tab" mc-section="share-windows">Share windows</a>');
		
		mc.updateTabsBar(".mc-tabs-bar");
		mc.toogleTabs(true);
		
	}else if( /\/tricks/.test(location.hash) ){
		$(".mc-tabs-bar").html('');
		$(".mc-tabs-bar").append('<a href="#/tricks?splash" class="mc-tab" mc-section="splash">Splash</a>');
		$(".mc-tabs-bar").append('<a href="#/tricks?toogle-navigation" class="mc-tab" mc-section="toogle-navigation">Navigation</a>');
		$(".mc-tabs-bar").append('<a href="#/tricks?toogle-submenu" class="mc-tab" mc-section="toogle-submenu">Submenu</a>');
		$(".mc-tabs-bar").append('<a href="#/tricks?toogle-tabsbar" class="mc-tab" mc-section="toogle-tabsbar">Tabs Bar</a>');
		$(".mc-tabs-bar").append('<a href="#/tricks?toogle-dialogs" class="mc-tab" mc-section="toogle-dialogs">Dialogs</a>');
		$(".mc-tabs-bar").append('<a href="#/tricks?device-type" class="mc-tab" mc-section="device-type">Devices</a>');
		$(".mc-tabs-bar").append('<a href="#/tricks?dynamic-buttons" class="mc-tab" mc-section="dynamic-buttons">Dynamic Buttons</a>');
		
		mc.updateTabsBar(".mc-tabs-bar");
		mc.toogleTabs(true);
		
	}else{
		$(".mc-tabs-bar").html('');
		mc.toogleTabs(false);
		
	}
	
	/*	Mark tab as selected	*/
	for(var x in $routeParams){
		$("[mc-section='"+ x +"']").addClass("mc-selected");
	}
	
	/*	Create custom notification	*/
	$scope.text = "This is a normal notification.";
	$scope.textType = "mc-text";
	$scope.buttonType = "comb";
	
	$scope.createNotification = function(){
		
		if($scope.buttonType != "none"){
			notification.create($scope.text, $scope.textType, "cancel", $scope.buttonType);
			
		}else{
			notification.create($scope.text, $scope.textType);
		}
	}

	$scope.openFloatingWindow = function(param){
		
		$(".mc-floating-window").each(function(){
			$(this).addClass("mc-hidden");
		});
		
		if(param){
			$(".mc-floating-window[mc-layout='"+param+"']").removeClass("mc-hidden");
		
		}else{
			$(".mc-floating-window:not([mc-layout])").removeClass("mc-hidden");
		}
		
	}

	$scope.toogleHeaderMenu = function(){
		if( $("#normalMenuHeader").hasClass("mc-hidden") ){
			$("#normalMenuHeader").removeClass("mc-hidden");
		}
		else{
			$("#normalMenuHeader").addClass("mc-hidden");
		}
		
		if( $("#accountinfoMenuheader").hasClass("mc-hidden") ){
			$("#accountinfoMenuheader").removeClass("mc-hidden");
		}
		else{
			$("#accountinfoMenuheader").addClass("mc-hidden");
		}
		
		if( $(".mc-navigation").hasClass("mc-accountinfo") ){
			$(".mc-navigation").removeClass("mc-accountinfo");
		}
		else{
			$(".mc-navigation").addClass("mc-accountinfo");
		}
	
		mc.toogleNavigation();
	}

	$scope.showSpashScreen = function(){
		$(".mc-splash").fadeIn("fast", function(){
			setTimeout(function(){
				$(".mc-splash").fadeOut("fast");
			}, 5000);
		});
	}
	
	$scope.frontLayoutSample = function(){
		$("body").attr("mc-layout", "front");
		setTimeout(function(){
			$("body").removeAttr("mc-layout");
		}, 5000);
	}
	
	$scope.noNavigationSample = function(){
		$("body").attr("mc-layout", "no-nav");
		setTimeout(function(){
			$("body").removeAttr("mc-layout");
		}, 5000);
	}
	
	$scope.hiddenNavigationSample = function(){
		$("body").attr("mc-layout", "hidden-nav");
		setTimeout(function(){
			$("body").removeAttr("mc-layout");
		}, 5000);
	}
	
	$("#clickableColorBtn").on("click", function(){
		
		if( $(this).hasClass("mc-bg-brown") ){
			$(this).removeClass("mc-bg-brown");
			
		}else{
			$(this).addClass("mc-bg-brown");
		}
		
	});
	
	$("#clickableBtn").on("click", function(){
		
		if( $(this).hasClass("mc-button-icon") ){
			
			$(this).removeClass("mc-button-icon");
			$(this).addClass("mc-button-comb");
			$(this).html("click me!");
			
		}else{
			$(this).addClass("mc-button-icon");
			$(this).removeClass("mc-button-comb");
			$(this).html("");
		}
	});
	
	$("#hoverBtn").on("mouseenter", function(){
	
		$(this).addClass("mc-bg-pink");
		$(this).removeClass("mc-button-icon");
		$(this).addClass("mc-button-comb");
		$(this).attr("mc-action", "done");
		$(this).html("hover me!");
	
	}).on("mouseleave", function(){
	
		$(this).removeClass("mc-bg-pink");
		$(this).addClass("mc-button-icon");
		$(this).removeClass("mc-button-comb");
		$(this).attr("mc-action", "download");
		$(this).html("");
	});
});