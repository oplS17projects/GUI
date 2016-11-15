// Inclass Excerise
// Chuong Vu
$(function() {
    // get li with word 'pine' and replace it to 'almonds'
    $('li:contains("pine")').text('almonds');

    // get all li items from the html page containt class 'hot'
    $('li.hot').html(function() {
        // update the content back to <li> tag
        return '<em>' + $(this).text() + '</em>';;
    });

    // remove the first <li> element
    $('li#one').remove();
});