$(document).on('click', '.show', function(){
  $('.slider2').fadeIn();

  var mySwiper2 = new Swiper ('.slider2', {
    initialSlide: 0,
    loop: true,
    shortSwipes: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });
});

let slider2 = $('.slider2').html();

$(document).on('click', '.hide', function(){
  $.when(
    // 先に実行したい処理
    $('.slider2').fadeOut(),
  ).done(function() {
      // 後に実行したい処理
    $('.slider2').removeAttr('style');
    $('.slider2').attr('class', 'swiper-container slider2');
    $('.slider2').html(slider2);
	});
});

