materialCSS.controller('themeCreatorController', function($scope, $location, $routeParams){
	
	/*	Start the controller functions	*/
	
	/*	Write the Section on the title bar	*/
	$scope.section = "Theme Creator";	
	$("body > .mc-header .mc-title").html( $scope.section );
	$("body").attr( "mc-layout", "" );
	mc.toogleTabs(false);
	
	$("body > .mc-header > .mc-tabs-bar").html("");
	$("body > .mc-header").append("<div id='properties' class='mc-header-line'></div>");
	$("#properties").append('<span class="mc-button mc-button-icon mc-clickable" mc-action="picker" mc-tooltip="1"></span>');
	$("#properties").append('<span class="mc-tooltip" mc-item="1">Pick an element</span>');
	$("#properties").append('<div class="mc-dropdown"><select><option value="">Select a background color</option><option value="Test">Testing</option></select><div class="mc-dropdown-bg"><div class="mc-dropdown-value"></div></div><div class="mc-dropdown-menu"></div></div>');
	mc.initializeDropdowns();
});