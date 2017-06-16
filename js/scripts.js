var jumboHeight = $('.jumbotron').outerHeight();
function parallax(){
    var scrolled = $(window).scrollTop();
    $('.bg').css('height', (jumboHeight-scrolled) + 'px');
}

$(window).scroll(function(e){
    parallax();
});

window.scrollTo(0,1);



$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
      side = $('.lbox'),
      back = $('.back'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();      
    });

    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        side.removeClass('blur');
        back.removeClass('blur');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        side.addClass('blur');
        back.addClass('blur');
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
});
