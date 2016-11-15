// Inclass Excerise
// Chuong Vu
$(function() {
    // select <ul> and insert new text use .before()
    $('ul').before('<p class="notice">Just updated</p>');

    //select all <li> with class='hot' and add '+' before text content
    $('li.hot').prepend('+ ');

    // create new <li> and insert to the last <li> using .after()
    var $newListItem = $('<li><em>gluten-free</em> soy sauce</li>');
    $('li:last').after($newListItem);
});