var jumboHeight = $('.jumbotron').outerHeight();
function parallax(){
    var scrolled = $(window).scrollTop();
    $('.bg').css('height', (jumboHeight-scrolled) + 'px');
}

$(window).scroll(function(e){
    parallax();
    console.log("Scrolled");
});

$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
      side = $('.lbox'),
      back = $('.back'),
      section= $('.sectionLink'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();      
    });

    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        side.removeClass('dim');
        back.removeClass('dim');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        side.addClass('dim');
        back.addClass('dim');
        isClosed = true;
      }
  }
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });  

      $(".navbar-nav li a").click(function(event) {
        $(".navbar-collapse").collapse('hide');
    });

      $('li a[href*=#]:not([href=#])').click(function() {
        var target = $(this).attr('href');
        $('.parallax').animate({
            scrollTop: $(target).offset().top + $('.parallax').scrollTop()
        },  800, 'easeInOutCirc');
        $('#wrapper').toggleClass('toggled');
        hamburger_cross();
        return false;
    });

    $('.sectionLink').click(function() {
        var target = $(this).attr('href');
        $('.parallax').animate({
            scrollTop: $(target).offset().top + $('.parallax').scrollTop()
        },  800, 'easeInOutCirc');
        return false;
    });

    console.log('test');
    var elem = document.getElementById("wrapper");
    if (elem.requestFullscreen) {
    elem.requestFullscreen();
    }
});

function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) || // alternative standard method  
    (!document.mozFullScreen && !document.webkitIsFullScreen)) { // current working methods  
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

$("jumbotron").click(function() {
    toggleFullScreen();
});