// Inclass Excerise
// Chuong Vu
$(function() {
    // remove class 'hot' in the third list element
    $('li#three').removeClass('hot');

    // add new class to all list element have class is hot
    $('li.hot').addClass('favorite'); 
});