//---------------------------------------------------------------------------
// Page behavior
//---------------------------------------------------------------------------

//Page Scroll
jQuery(document).ready(function ($) {
	$('a[href*="#"]').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
			|| location.hostname == this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top - 32
				}, 750);
				return false;
			}
		}
	});
});

// Fixed Nav
jQuery(document).ready(function ($) {
	$(window).scroll(function(){
		var scrollTop = $('header').height();
		if($(window).scrollTop() >= scrollTop){
			$('nav').css({
				position : 'fixed',
				top : '0',
			});
			$('.spacer').css('display','block');
		}
		if($(window).scrollTop() < scrollTop){
			$('nav').removeAttr('style');
			$('.spacer').removeAttr('style');
		}
	});
});

//---------------------------------------------------------------------------
// Quote form
//---------------------------------------------------------------------------

var quoteForm = $('#quote-form');

// initialize values //---------------------------------------------------------

initializeSliders();
quoteTotal();

//slider outputs
function initializeSliders(){
  //for each slider
  for (var i=0; i < $('.quote-slider').length; i++){
    //output values (matched by index)
    if ($('.slider-output')[i] > $('.quote-slider')[i]){
      $('.slider-output')[i].innerHTML = $('.quote-slider')[i].value;
    }
  }
}

// CTA
$('.cta-services').html('Carpet');
$('.cta-value').html('1');
$('.cta-total').html('4');

// on input //------------------------------------------------------------------

//sliders
$('.quote-slider').on( 'input' , function() {
  //set val to slider index
  var val = $('.quote-slider').index(this);
  //and output the value
  $('.slider-output')[val].innerHTML = this.value;
	//cta
	$('.cta-value').html(this.value);
});

quoteForm.on( 'input', function(){
	quoteTotal();
});

// toggle residential / commercial //-------------------------------------------

$('.residential-button').on('click', function(){
		quoteForm.removeClass('commercial').addClass('residential');
		$('.commercial-slider').css('display', 'none');
		$('.residential-slider').css('display', 'inline');
		//cta
		$('.cta-value').html($('.slider-output')[0].innerHTML);
		$('.cta-toggle').html('room(s)');
	});

$('.commercial-button').on('click', function(){
		quoteForm.removeClass('residential').addClass('commercial');
		$('.residential-slider').css('display', 'none');
		$('.commercial-slider').css('display', 'inline');
		//cta
		$('.cta-value').html($('.slider-output')[1].innerHTML);
		$('.cta-toggle').html('sq. ft.');
	});

// Services CTA
quoteForm.on('input', function(){
	$('.cta-services').html($('input:checked').map(function(){
			return $(this).val();
	}).get().join(" & "));
});

// get total //-----------------------------------------------------------------

function quoteTotal(){
var total = 0;
  //sliders
    for (var i=0; i < $('.slider-output').length; i++){
      var sliderDollarValue = 0;
      switch (Number($('.slider-output')[i].innerHTML)) {
        case 1:
          sliderDollarValue = 1;
          break;
        case 2:
          sliderDollarValue = 2;
          break;
        case 3:
          sliderDollarValue = 3;
          break;
        default:
      }
	    //add to total
	    total += sliderDollarValue;
    };
  // radio buttons
	  for (var i=0; i < $('.quote-radio').length; i++){
      var radioDollarValue = 0;
			if ($('.quote-radio')[i].checked) {
        switch (i) {
          case 0:
            radioDollarValue = 1;
            break;
          case 1:
            radioDollarValue = 1;
            break;
          case 2:
            radioDollarValue = 1;
            break;
          case 3:
            radioDollarValue = 1;
            break;
          default:
        }
			}
      //add to total
      total += radioDollarValue;
    };
  //checks
	  for (var i=0; i < $('.quote-check').length; i++){
      var checkDollarValue = 0;
			if ($('.quote-check')[i].checked) {
	      switch (i) {
	        case 0:
	          checkDollarValue = 1;
	          break;
	        case 1:
	          checkDollarValue = 1;
	          break;
	        case 2:
	          checkDollarValue = 1;
	          break;
	        default:
	      }
			}
      //add to total
      total += checkDollarValue;
    };
  $('#quote-total')[0].innerHTML = total;
	//CTA
	$('.cta-total').html($('#quote-total').html());
};

//---------------------------------------------------------------------------
// Review slider
//---------------------------------------------------------------------------

jQuery(document).ready(function ($) {

  setInterval(function () {
      moveRight();
  }, 3000);

	var slideCount = $('#reviewSlider ul li').length;
	var slideWidth = $('#reviewSlider ul li').width();
	var slideHeight = $('#reviewSlider ul li').height();
	var sliderUlWidth = slideCount * slideWidth;

	$('#reviewSlider').css({ width: slideWidth, height: slideHeight });

	$('#reviewSlider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });

    $('#reviewSlider ul li:last-child').prependTo('#reviewSlider ul');

    function moveLeft() {
        $('#reviewSlider ul').animate({
            left: + slideWidth
        }, 200, function () {
            $('#reviewSlider ul li:last-child').prependTo('#reviewSlider ul');
            $('#reviewSlider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#reviewSlider ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#reviewSlider ul li:first-child').appendTo('#reviewSlider ul');
            $('#reviewSlider ul').css('left', '');
        });
    };

    $('.control_prev').click(function () {
        moveLeft();
    });

    $('.control_next').click(function () {
        moveRight();
    });

});
