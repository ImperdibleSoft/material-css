
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
/* --- http://www.github.io/imperdiblesoft/material-css		---------------------- */
/* -------------------------------------------------------------------------------------- */


/*	Material CSS Functions	*/
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

mc.toogleNavigation = function(param){
  if(( $("body > .mc-navigation").hasClass("opened") && typeof(param) == "undefined" ) || param === false ){
    
    /*	Close the menu bar	*/
    $("body > .mc-navigation").removeClass("opened");
    $("body > .mc-navigation .mc-header-menu").removeClass("opened");
    $(".mc-menu-blocker").remove();
    
    }else if(( !$("body > .mc-navigation").hasClass("opened") && typeof(param) == "undefined" ) || param === true ){
    
    /*	Open the menu bar	*/
    $("body > .mc-navigation").addClass("opened");
    $("body > .mc-navigation .mc-header-menu").addClass("opened");
    $("body").append("<div class='mc-blocker mc-menu-blocker'></div>");
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
mc.initializeNavigation = function(){
  
  /*	Click on header-menu icon, mobile version	*/
  $(".mc-header .mc-button-icon[mc-action='menu'], .mc-navigation .mc-button-icon[mc-action='prev']").each(function(){
    $(this).click(function(){
      mc.toogleNavigation();
    });
  });
  
  /*	Click on menu-item or menu-subitem	*/
  $(".mc-navigation .mc-nav-item, .mc-navigation .mc-nav-subitem").each(function(){
    $(this).click(function(){
      if( !$(this).attr("mc-menu") ){
        mc.toogleNavigation( false );
      }
    });
  });
  
  /*	Click on menu item	*/
  $("[mc-menu]").each(function(){
    $(this).click(function(){
      mc.toogleSubMenu( $(this).attr("mc-menu") );
    });
  });
}

mc.toogleTabs = function(param){
  if(( !$(".mc-tabs-bar").hasClass("mc-opened") && typeof(param) == "undefined" ) || param === true  ){
    
    /*	Open the tabs bar	*/
    $(".mc-tabs-bar").addClass("mc-opened");
    $("body > .mc-content").removeClass("mc-untabbed");
    
    }else if(( $(".mc-tabs-bar").hasClass("opened") && typeof(param) == "undefined" ) || param === false  ){
    
    /*	Close the tabs bar	*/
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
  $(param).css("left", "0px");
}

mc.initializeDropdowns = function(param){
  $(".mc-dropdown").each(function(){
    var newVal = $(this).children("select").children("option[selected]").html();
    if( !newVal && $(this).children("select").children("option")[0]){
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
    
    if( !floatingWindows || (floatingWindows && notifications >= floatingWindows)){
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

mc.resizeLayoutImages = function(){
  
  setTimeout(function(){
    
    /*	Layout = "left-image"	*/
    if( $(".mc-card[mc-layout='left-image'] .mc-header img")[0] && $(".mc-card[mc-layout='left-image'] .mc-header img")[0].width >= 1 ){
      
      var newHeight = parseInt( $(".mc-card[mc-layout='left-image'] .mc-content").height() ) + parseInt( $(".mc-card[mc-layout='left-image'] .mc-content").css("margin-bottom") );
      $(".mc-card[mc-layout='left-image'] .mc-header").animate({"height": newHeight}, 0, function(){
        
        $(".mc-card[mc-layout='left-image'] .mc-header img").css("height", "100%");
      } );
    }
    
    /*	Layout = "right-image"	*/
    if( $(".mc-card[mc-layout='right-image'] .mc-header img")[0] && $(".mc-card[mc-layout='right-image'] .mc-header img")[0].width >= 1 ){
      
      var newHeight = parseInt( $(".mc-card[mc-layout='right-image'] .mc-content").height() ) + parseInt( $(".mc-card[mc-layout='right-image'] .mc-content").css("margin-bottom") );
      $(".mc-card[mc-layout='right-image'] .mc-header").animate({"height": newHeight}, 0, function(){
        
        $(".mc-card[mc-layout='right-image'] .mc-header img").css("height", "100%" );
      });
    }
    
    /*	Layout = "grid-images"	*/
    if( $(".mc-grid-item img")[0] && $(".mc-grid-item img")[0].width >= 1 ){
      
      if( $(".mc-grid-item").length >= 1){
        var height = parseInt( $( $(".mc-grid-item")[0] ).width() );
      }
      $(".mc-grid-item").each(function(){ 
        $(this).animate({"height": height }, 0, function(){
          if( $(this).children("img").width() < $(this).children("img").height()  ){
            $(this).children("img").width("100%");
            $(this).children("img").height("auto");
          }
        });
      });
    }
    
  }, 300);
}

mc.resizeDialogsHeight = function(){
  
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

$(document).ready(function(mc){
  $("body").addClass("mc-noscroll");
  
  var mc = window.mc;
  
  /*	Vars for open/close menu	*/
  var initial, previus, current, last;
  
  /*	Vars for control the scrolling	*/
  var prevScroll, currentScroll;
  var initialHeight = 0;
  
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
  element.addEventListener('touchstart', function(e){
    initial = e.changedTouches[0].clientX;
    previus = e.changedTouches[0].clientX;
    
    /*	If we are on the Tab Bar	*/
    if( $(e.target).hasClass("mc-tabs-bar") || $(e.target).hasClass("mc-tab") ){
      
      /*	Select the mc-tabs-bar	*/
      var touchedElem = e.target;
      if( $(touchedElem).hasClass("mc-tab") ){
        touchedElem = $(touchedElem).parent(".mc-tabs-bar");
      }
      
      initialMargin = parseInt( $(touchedElem).css("left") );
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
  element.addEventListener('touchmove', function(e){
    
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
      if( parseInt( $(touchedElem).width() ) >= $(".mc-header").width()){
        var newMargin = initialMargin + parseInt( current ) - parseInt( initial );
        var minMargin = (parseInt($(touchedElem).width() ) - $(".mc-header").width() + 10) * (-1);
        
        /*	If  try to move to the left too much	*/
        if(newMargin >= 0){
          $(touchedElem).css("left", "0px");
        }
        
        /*	If  try to move to the right too much	*/
        else if( newMargin <= minMargin ){
          $(touchedElem).css("left", minMargin + "px");
        }
        
        /*	If  try to move normal	*/
        else{
          $(touchedElem).css("left", newMargin +"px");
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
  element.addEventListener('touchend', function(e){
    last = e.changedTouches[0].clientX;
    
    /*	If we are on the Tab Bar	*/
    if( $(e.target).hasClass("mc-tabs-bar") || $(e.target).hasClass("mc-tab") ){
      
      /*	Select the mc-tabs-bar	*/
      var touchedElem = e.target;
      if( $(touchedElem).hasClass("mc-tab") ){
        touchedElem = $(touchedElem).parent(".mc-tabs-bar");
      }
      
      /*	If the bar is bigger than the screen	*/
      if( parseInt( $(touchedElem).width() ) >= $(".mc-header").width()){
        var newMargin = initialMargin + parseInt( current ) - parseInt( initial );
        var minMargin = (parseInt($(touchedElem).width() ) - $(".mc-header").width() + 10) * (-1);
        
        /*	If  try to move to the left too much	*/
        if(newMargin >= 0){
          $(touchedElem).css("left", "0px");
        }
        
        /*	If  try to move to the right too much	*/
        else if( newMargin <= minMargin ){
          $(touchedElem).css("left", minMargin + "px");
        }
        
        /*	If  try to move normal	*/
        else{
          $(touchedElem).css("left", newMargin +"px");
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
    else if(last >= (initial + 100) && $("body").attr("mc-layout") != "no-nav" ){
      mc.toogleNavigation( true );
      
      /*	Close the menu	*/
      }else if(initial >= (last + 100) && $("body").attr("mc-layout") != "no-nav"){
      mc.toogleNavigation( false );
    }
    
    mc.resizeLayoutImages();
    mc.updateFloatingButtons();
  });
  
  /*	Detect the mouse click start	*/
  element.addEventListener("mousedown", function(e){
    
    /*	If we are on a Slider	*/
    if( $(e.target).hasClass("mc-slider") || $(e.target).hasClass("mc-slider-bg") || $(e.target).hasClass("mc-slider-progress") || $(e.target).hasClass("mc-slider-picker") ){
      var touchedElem = e.target;
      if( $(touchedElem).hasClass("mc-slider") ){
        if( $(touchedElem).children("input[type='range']").attr("disabled") ){
          touchedElem = false;
        }
        else{
          touchedElem = $(touchedElem).children(".mc-slider-bg");
        }
        
        }else if( $(touchedElem).hasClass("mc-slider-progress") || $(touchedElem).hasClass("mc-slider-picker") ){
        if( $(touchedElem).parent(".mc-slider-bg").parent(".mc-slider").children("input[type='range']").attr("disabled") ){
          touchedElem = false;
        }
        else{
          touchedElem = $(touchedElem).parent(".mc-slider-bg");
        }
        
        }else if( $(touchedElem).hasClass("mc-slider-bg") ){ 
        if( $(touchedElem).parent(".mc-slider").children("input[type='range']").attr("disabled") ){
          touchedElem = false;
        }
      }
      
      if(touchedElem){
        var touch = e.clientX - $(touchedElem).offset().left;
        var min = 0;
        var max = $(touchedElem).width();
        
        if(touch >= min && touch <= max ){
          animateSlider(touchedElem, touch);
        }
      }
    }
    
  });
  
  /*	Detect the mouse click	*/
  element.addEventListener("click", function(e){
    
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
    
    /* If we are on a clickable element */
    else if( $(e.target).hasClass("mc-clickable") || $(e.target).hasClass("mc-button") || $(e.target).hasClass("mc-tab") || $(e.target).hasClass("mc-nav-item") || $(e.target).hasClass("mc-nav-subitem") ){
      
      /*	Click effect	*/
      var parent, ink, d, x, y;
      parent = $(e.target);
      
      //create .ink element if it doesn't exist
      if(parent.find(".ink").length == 0){
        parent.prepend("<span class='ink'></span>");
      }
      
      ink = parent.find(".ink");
      //incase of quick double clicks stop the previous animation
      ink.removeClass("animate");
      
      //set size of .ink
      if(!ink.height() && !ink.width()){
        //use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
        d = Math.max(parent.outerWidth(), parent.outerHeight());
        ink.css({height: d, width: d});
      }
      
      //get click coordinates
      //logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
      x = e.pageX - parent.offset().left - ink.width()/2;
      y = e.pageY - parent.offset().top - ink.height()/2;
      
      //set the position and add class .animate
      ink.css({top: y+'px', left: x+'px'}).addClass("animate");
    }
    
    mc.resizeLayoutImages();
    mc.resizeDialogsHeight();
    mc.updateFloatingButtons();
  });
  
  /*	Detect the keyboard keyup	*/
  element.addEventListener("keyup", function(e){
    
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
  window.addEventListener("load", function(e){
    mc.initializeNavigation();
    mc.initializeDropdowns();
    mc.initializeSliders();
    mc.resizeLayoutImages();
    mc.updateFloatingButtons();
    mc.resizeDialogsHeight();
    
    /*	Add the blocker element	*/
    $("body").append("<div class='mc-blocker'></div>");
    $("body > .mc-content").append("<div class='mc-content-blocker'></div>");
    
    /*	Remove the splash screen	*/
    $("body").removeClass("mc-noscroll");
    $(".mc-splash").fadeOut();
    
  });
  
  /*	Detect the window scroll	*/
  window.addEventListener("scroll", function(e){
    
    currentScroll = parseInt( $("body").scrollTop() );
    
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
    
    /*	If there is a front layout	*/
    if( $("body[mc-layout='front']")[0] && $("body[mc-layout='front'] > .mc-header")[0] ){
      
      /*	Set the initial height of the element	*/
      if(initialHeight == 0){
        initialHeight = $("body[mc-layout='front'] > .mc-header").height();
      }
      
      /*	Reduces the height, and move the image	*/
      if((initialHeight - currentScroll) > 56){
        $("body[mc-layout='front'] > .mc-header").css("height", (initialHeight - currentScroll));
        
        if(( $("body[mc-layout='front'] > .mc-header img").height() - $("body[mc-layout='front'] > .mc-header").height() ) > 0 ){
          var newMargin = ($("body[mc-layout='front'] > .mc-header img").height() - $("body[mc-layout='front'] > .mc-header").height());
          $("body[mc-layout='front'] > .mc-header img").css("margin-top", (newMargin * (-0.5)));
        }
      }
      
      /*	Modify the opacity	*/
      if((initialHeight - currentScroll) >= 56 && (initialHeight - currentScroll) <= 96){
        var newOpacity = ((initialHeight - currentScroll - 56) * 0.025);
        $("body[mc-layout='front'] > .mc-header img").css("opacity", newOpacity);
      }
      else if((initialHeight - currentScroll) < 56){
        var newOpacity = 0;
        $("body[mc-layout='front'] > .mc-header img").css("opacity", newOpacity);
        $("body[mc-layout='front'] > .mc-header").css("height", 56);
      }
      else if((initialHeight - currentScroll) > 96){
        var newOpacity = 1;
        $("body[mc-layout='front'] > .mc-header img").css("opacity", newOpacity);
      }
      
      if(currentScroll <= 0){
        //$("body[mc-layout='front'] > .mc-header img").removeAttr("style");
      }
    }
    
    prevScroll = currentScroll;
    
    mc.initializeDropdowns();
    mc.initializeSliders();
  });
  
  /*	Detect the window resize	*/
  window.addEventListener("resize", function(e){
    mc.initializeDropdowns();
    mc.initializeSliders();
    mc.resizeLayoutImages();
    mc.resizeDialogsHeight();
    mc.updateFloatingButtons();
  });
  
  /*	Detect the mouse move	*/
  window.addEventListener("mousemove", function(e){
    
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
    
    mc.updateFloatingButtons();
  });
  
  /*	Detect location change	*/
  window.addEventListener("hashchange", function(){
    $("body > .mc-header").removeAttr("style");
  })
  
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
  
});