var jumboHeight = $('.jumbotron').outerHeight();
function parallax(){
    var scrolled = $(window).scrollTop();
    $('.bg').css('height', (jumboHeight-scrolled) + 'px');
}

$(window).scroll(function(e){
    parallax();
});

$(function() {
    $('li a[href*=#]:not([href=#])').click(function() {
        var target = $(this).attr('href');
        $('.parallax').animate({
            scrollTop: $(target).offset().top + $('.parallax').scrollTop()
        },  800, 'easeInOutCirc');
        return false;
    });
});

$(document).ready(function () {
    $(".navbar-nav li a").click(function(event) {
        $(".navbar-collapse").collapse('hide');
    });
});
