materialCSS.controller('mediaPlayerController', function($scope, $location, $routeParams, $timeout){
	
	/*	Start the controller functions	*/
	
	/*	Write the Section on the title bar	*/
	$scope.playlist = false;
	$scope.tooglePlayList = function(){
		$scope.playlist = !$scope.playlist;
	}
	
	$scope.tracklist = {
		"1": {
			"id": "1",
			"title": "Victory", 
			"artist": "Wali Finkbeiner",
			"src": "media/wali_victory.mp3",
			"image": "media/wali_victory_cover.jpg"
		},
		"2": {
			"id": "2",
			"title": "B.R.T.", 
			"artist": "Wali Finkbeiner",
			"src": "media/wali_brt.mp3",
			"image": "media/wali_brt_cover.jpg"
		},
		"3": {
			"id": "3",
			"title": "Revelation", 
			"artist": "Wali Finkbeiner",
			"src": "media/wali_revelation.mp3",
			"image": "media/wali_revelation_cover.jpg"
		},
		"4": {
			"id": "4",
			"title": "Implosion", 
			"artist": "Wali Finkbeiner",
			"src": "media/wali_implosion.mp3",
			"image": "media/wali_implosion_cover.jpg"
		},
		"5": {
			"id": "5",
			"title": "Classic dem inna dancehall", 
			"artist": "Profecia Crew",
			"src": "media/classic.mp3",
			"image": "media/classic.jpg"
		}
	}
	
	$scope.playing = $scope.tracklist[4];
	
	/*	Start a track from its begining	*/
	$scope.reproduce = function(param){
		var music = document.getElementById("soundtrack");
		
		$scope.playing = $scope.tracklist[param];
		$scope.playlist = false;

		music.currentTime = 0;
		$("[mc-layout='multimedia'] > .mc-window-footer > .mc-slider > input[type='range']").attr("value", music.currentTime);
		$("[mc-layout='multimedia'] > .mc-window-footer > .mc-slider > input[type='range']").attr("max", music.duration);
		mc.initializeSliders();
		
		$timeout(function(){
			$scope.playMusic();
		});
	}
	
	/*	Toogle play/pause	*/
	$scope.play = function(e){
		var music = document.getElementById("soundtrack");
		
		if( $(e.target).attr("mc-action") != "play"){
			if(music.Pause){
				music.Pause();
			}else{
				music.pause();
			}
			$(e.target).attr("mc-action", "play");
			
		}else{
			$scope.playMusic();
		}
	}
	
	/*	Makes the music sound	*/
	$scope.playMusic = function(){
		var music = document.getElementById("soundtrack");
		
		if(music.Play){
			music.Play();
		}else{
			music.play();
		}
		$("[mc-layout='multimedia'] > .mc-window-footer > [mc-action='play']").attr("mc-action", "pause");
		settingTime = false;
	}
	
	/*	Select the next track	*/
	$scope.next = function(){
		var music = document.getElementById("soundtrack");
		var temp = 0;
		
		if(parseInt($scope.playing.id) < sizeof($scope.tracklist) ){
			temp = $scope.tracklist[ parseInt($scope.playing.id) + 1 ];
			
		}else{
			temp = $scope.tracklist[1];
		}
		$scope.reproduce( temp.id );
	}
	
	/*	Select the previous track	*/
	$scope.prev = function(){
		var music = document.getElementById("soundtrack");
		
		if(parseInt($scope.playing.id) > 1 ){
			$scope.playing = $scope.tracklist[ parseInt($scope.playing.id) - 1 ];
			
		}else{
			$scope.playing = $scope.tracklist[ sizeof($scope.tracklist) ];
		}
		$scope.reproduce( $scope.playing.id );
	}
	
	/*	Set the current time	*/
	var settingTime = false;
	$scope.setCurrentTime = function(e){
		settingTime = true;
		var music = document.getElementById("soundtrack");
		var touchedElem = $(e).children("input[type='range']");
		
		music.currentTime = $(touchedElem).attr("value");
		setTimeout(function(){
			settingTime = false;
		}, 50);
	}
	
	/*	Update the time slider and go to the next track	*/
	$scope.updateSlider = function(){
		if( !settingTime ){
			var music = document.getElementById("soundtrack");
			if(parseInt(music.currentTime) >= parseInt(music.duration)){
				settingTime = true;
				$scope.next();
				
			}else{
				$("[mc-layout='multimedia'] > .mc-window-footer > .mc-slider > input[type='range']").attr("value", music.currentTime);
				$("[mc-layout='multimedia'] > .mc-window-footer > .mc-slider > input[type='range']").attr("max", music.duration);
				mc.initializeSliders();
			}
		}
		$timeout(function(){
			$scope.updateSlider();
		}, 500);
	}
	
	$timeout(function(){
		//$scope.playMusic();
		$scope.updateSlider();
		
		$("[mc-layout='multimedia'] > .mc-window-footer > .mc-slider, [mc-layout='multimedia'] > .mc-window-footer > .mc-slider > .mc-slider-bg, [mc-layout='multimedia'] > .mc-window-footer > .mc-slider > .mc-slider-bg > .mc-slider-progress, [mc-layout='multimedia'] > .mc-window-footer > .mc-slider > .mc-slider-bg > .mc-slider-picker").on("click", function(){
			$scope.setCurrentTime( $("[mc-layout='multimedia'] > .mc-window-footer > .mc-slider") );
		});
	});
	
	/*	Funciones genéricas */
	function sizeof(objeto){
		var contador = 0;
		for(i in objeto) {
			contador++;
		}
		return contador;
	}
	
});