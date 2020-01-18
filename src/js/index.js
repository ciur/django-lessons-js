import $ from "jquery";
import 'bootstrap';
import Quill from 'quill';
// js code here

let article = document.getElementById('id_article');
let editor;

let options = {
  placeholder: 'Compose an epic...',
  theme: 'snow'
};

if (article) {
    editor = new Quill(article, options);
} else {
    console.log("Article not found");
};
