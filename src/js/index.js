import $ from "jquery";
import 'bootstrap';
import Quill from 'quill/core';
import Toolbar from 'quill/modules/toolbar';
import Snow from 'quill/themes/snow';
import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import Header from 'quill/formats/header';


Quill.register({
  'modules/toolbar': Toolbar,
  'themes/snow': Snow,
  'formats/bold': Bold,
  'formats/italic': Italic,
  'formats/header': Header
});


export default Quill;
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
