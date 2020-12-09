$(document).on('click', '.show', function(){
  $('.slider2').fadeIn();

  var mySwiper2 = new Swiper ('.slider2', {
    loop: true,
    shortSwipes: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });
});

let slider2 = $('.wrap').html();

$(document).on('click', '.hide', function(){
  $.when(
    // 先に実行したい処理
    $('.slider2').fadeOut(),
  ).done(function() {
      // 後に実行したい処理
    $('.wrap').html(slider2);
	});
});

