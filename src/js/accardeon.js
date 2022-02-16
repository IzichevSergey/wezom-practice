import $ from 'jquery';

$('.js-accardeon').on('click', function () {
  $(this).hasClass('accardeon--active')
    ? closeAccardeon($(this))
    : openAccardeons($(this));
});

function openAccardeons(elem) {
  elem.addClass('accardeon--active');
}

function closeAccardeon(elem) {
  elem.removeClass('accardeon--active');
}
