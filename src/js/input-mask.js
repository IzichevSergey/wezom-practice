import $ from 'jquery';
import Inputmask from 'inputmask';

Inputmask({ mask: '+ 99 (999) 99 - 99 - 999' }).mask($('.js-input'));
