import $ from 'jquery';

$('.burger--js').on('click', function () {
  $('.burger--js').hasClass('burger--active')
    ? closeBurgerMenu()
    : openBergerMenu();
});

$('.burger-mask').on('click', function () {
  closeBurgerMenu();
});

function openBergerMenu() {
  $('.burger--js').addClass('burger--active');
  $('.burger-menu').addClass('burger-menu--active');
  $('body').addClass('body--disable');
  $('.burger-mask').addClass('burger-mask--active');
}

function closeBurgerMenu() {
  $('.burger--js').removeClass('burger--active');
  $('.burger-menu').removeClass('burger-menu--active');
  $('body').removeClass('body--disable');
  $('.burger-mask').removeClass('burger-mask--active');
}
