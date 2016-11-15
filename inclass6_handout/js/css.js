// Inclass Excerise
// Chuong Vu
$(function() {
    // Get the background color from first <li> tag
    var backgroundColor = $('li').css('background-color');

    // Write the background color of first <li> to page after <ul> using .append()
    $('ul').append('<p>Color was: ' + backgroundColor + '</p>');

    // Update CSS properties using .css() method to <li> elements
    $('li').css({
        'background-color': '#c5a996',
        'border': '1px solid #fff',
        'color': '#000',
        'text-shadow': 'none',
        'font-family': 'Georgia',
    });
});