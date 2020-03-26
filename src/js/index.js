import $ from "jquery";
import 'bootstrap';
import copy_url from "./copy_url";


$(function () {
  $('#tab li:first-child a').tab('show');
  $('#copy-url').click(function(e) { copy_url(); })
})