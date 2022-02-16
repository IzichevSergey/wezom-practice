import json from './users.json';
import $ from 'jquery';

$('.js-reviews__btn-more').on('click', function () {
  creatingUsers(json.users);
  toggleElements(this, true);
});

function creatingUsers(data) {
  const parent = document.querySelector('.js-reviews');
  const template = document.querySelector('#js-review');
  let frag = document.createDocumentFragment();

  data.forEach((user) => {
    let review = template.content.cloneNode(true);
    review.querySelector('.js-review__name').textContent = user.name;
    review.querySelector('.js-review__date').textContent = `/ ${user.date}`;
    review.querySelector('.js-review__stars').dataset.total = user.stars;
    review.querySelector('.js-review__text').textContent = user.text;

    frag.appendChild(review);
  });

  parent.appendChild(frag);
}

function toggleElements(btn, flag) {
  btn.classList.toggle('hidden', flag);
}
