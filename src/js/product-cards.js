import $ from 'jquery';

$('.js-product-card').on('click', function () {
  $('.js-product-card').removeClass('product-card__images-img--active');
  $(this).addClass('product-card__images-img--active');
  $('.js-main-img').removeClass('product-card__img--active');
  $($(this).attr('id')).addClass('product-card__img--active');
});
