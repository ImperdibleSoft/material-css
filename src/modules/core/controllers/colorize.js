materialCSS.controller('colorizeController', function($scope, $location, $routeParams){
  
  /*	Start the controller functions	*/
  
  /*	Product Version	*/
  $scope.versions = {
    "stable": false,
    "beta": "0.1.0208b",
    "nightly": "0.1.0208n"
  };
  
  /*	Write the Section on the title bar	*/
  $scope.section = $location.path();
  $scope.section = $scope.section.replace("/", "");
  $scope.section = $scope.section.replace("-", " ");
  
  if( $scope.section == ""){
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
  if( /\/color-classes/.test(location.hash) ){
    $(".mc-tabs-bar").html('');
    $(".mc-tabs-bar").append('<a href="#/color-classes?main-color" class="mc-tab" mc-section="main-color">Main Color</a>');
    $(".mc-tabs-bar").append('<a href="#/color-classes?bg-color" class="mc-tab" mc-section="bg-color">BG. Color</a>');
    $(".mc-tabs-bar").append('<a href="#/color-classes?color-palette" class="mc-tab" mc-section="color-palette">Color Palette</a>');
    $(".mc-tabs-bar").append('<a href="#/color-classes?special-colors" class="mc-tab" mc-section="special-colors">Special Colors</a>');
    
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
  
  /*	List the color themes	*/
  $scope.themes = {
    "notheme": {
      "id": 0,
      "name": "No Theme",
      "route": "color-themes/no-theme.css"
    },
    "default": {
      "id": 1,
      "name": "Material CSS",
      "route": "color-themes/default-theme.css",
      "img": "material_logo"
    },
    "android": {
      "id": 2,
      "name": "Android Lollipop",
      "route": "color-themes/android-theme.css",
      "img": "android"
    },
    "imperdiblesoft": {
      "id": 3,
      "name": "ImperdibleSoft",
      "route": "color-themes/imperdiblesoft-theme.css",
      "img": "imperdiblesoft"
    },
    "google": {
      "id": 4,
      "name": "Google+",
      "route": "color-themes/google-theme.css",
      "img": "google"
    },
    "facebook": {
      "id": 5,
      "name": "Facebook",
      "route": "color-themes/facebook-theme.css",
      "img": "facebook"
    },
    "twitter": {
      "id": 6,
      "name": "Twitter",
      "route": "color-themes/twitter-theme.css",
      "img": "twitter"
    },
    "spotify": {
      "id": 7,
      "name": "Spotify",
      "route": "color-themes/spottify-theme.css",
      "img": "spottify"
    },
    "mypetcard": {
      "id": 8,
      "name": "My Pet Card",
      "route": "color-themes/mypetcard-theme.css",
      "img": "mypetcard"
    }
  };
  
  /*	Select the CSS line	*/
  var themeLine;
  $("link[type='text/css']").each(function(){
    if( /color-themes/.test( $(this).attr("href") ) ){
      themeLine = $(this);
    }
  });
  
  /*	Select the current Theme	*/
  $scope.selectedTheme = $(themeLine).attr("href");
  
  $scope.update = function(param){
    $(themeLine).attr("href", param);
  }
  
  $scope.download = function(){
    var newDownload = window.open( $scope.selectedTheme +".zip", "Download theme - Material CSS");	
  }
  
  $scope.downloadCustomColors = function(){
    var newDownload = window.open( "color-themes/custom-colors.css.zip", "Download file - Material CSS");	
  }
});