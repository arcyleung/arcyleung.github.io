//Based on the Scroller function from @sallar
var $content = $('header .content')
  , $blur    = $('header .overlay')
  , wHeight  = $(window).height()
  , wWidth  = $(window).width();

$(window).on('resize', function(){
  if($(this).wWidth != wWidth){
    wHeight =  window.innerHeight ? window.innerHeight : $(window).height();
    wWidth =  window.innerWidth ? window.innerWidth : $(window).width();
      wWidth = $(this).width();
   }

   if ($(this).wHeight != wHeight){
    wHeight = window.innerHeight ? window.innerHeight : $(window).height();
   }
		
		// location.reload();
});


window.requestAnimFrame = (function()
{
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function Scroller()
{
  this.latestKnownScrollY = 0;
  this.ticking            = false;
}

function addTriangleTo(target) {
    var dimensions = target.getClientRects()[0];
    var pattern = Trianglify({
        width: dimensions.width, 
        height: dimensions.height
    });
    target.style['background-image'] = 'url(' + pattern.png() + ')';
}

//Nav smoothscroll
$(document).on('click','.searchbychar', function(event) {
    event.preventDefault();
    var target = "#" + this.getAttribute('data-target');
    $('html, body').animate({
        scrollTop: $(target).offset().top
    }, 2000);
});


// parallax header
$(window).scroll( function(){
      var scroll = $(window).scrollTop(), slowScroll = scroll/2;
      $('#polyhead').css({ 
        'transform': 'translateY(' + slowScroll + 'px)', 
        '-moz-transform': 'translateY(' + slowScroll + 'px)',
        '-webkit-transform': 'translateY(' + slowScroll + 'px)' });
      $('#polyhead').css({ 'filter': 'blur('+slowScroll/20+'px)' });
  });



Scroller.prototype = {
 
  init: function() {
    window.addEventListener('scroll', this.onScroll.bind(this), false);
    $blur.css('background-image',$('header:first-of-type').css('background-image'));
  },


  onScroll: function() {
    this.latestKnownScrollY = window.scrollY;
    this.requestTick();
  },

  
  requestTick: function() {
    if( !this.ticking ) {
      window.requestAnimFrame(this.update.bind(this));
    }
    this.ticking = true;
  },

  update: function() {
    var currentScrollY = this.latestKnownScrollY;
    this.ticking       = false;
    
    
    var slowScroll = currentScrollY / 2
      , blurScroll = currentScrollY * 2
      , opaScroll = 1.4 - currentScrollY / 400;
   if(currentScrollY > wHeight)
     $('nav').css('position','fixed');
   else
     $('nav').css('position','absolute');
    
    $content.css({
      'transform'         : 'translateY(' + slowScroll + 'px)',
      '-moz-transform'    : 'translateY(' + slowScroll + 'px)',
      '-webkit-transform' : 'translateY(' + slowScroll + 'px)',
      'opacity' : opaScroll
    });
    
    $blur.css({
      'opacity' : blurScroll / wHeight
    });
  }
};


var scroller = new Scroller();  
scroller.init();