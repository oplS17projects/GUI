// Chuong Vu
// Email: Chuong_Vu@student.uml.edu

// ADD NEW ITEM TO END OF LIST
// get the list of element in ul tag
var list = document.getElementsByTagName('ul')[0];
// create new li element
var endItem = document.createElement('li');
// create text variables for last item
var endItemText = document.createTextNode('cream');
// add text item to the child
endItem.appendChild(endItemText);
// add child to ul element
list.appendChild(endItem);


// ADD NEW ITEM START OF LIST
// create new li element
var startItem = document.createElement('li');
// create text variables for last item
var startItemText = document.createTextNode('kale');
// add text item to the child
startItem.appendChild(startItemText);
// add child to ul element
list.insertBefore(startItem, list.firstChild);


// ADD A CLASS OF COOL TO ALL LIST ITEMS
// get list li child from the document
var iTemsList = document.getElementsByTagName('li');
// add/replace current class to 'cool' class based on number of <li> element
for (var i = 0; i < iTemsList.length; i++) {
    iTemsList[i].className = 'cool';
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
// get to the h2 tag
var heading = document.getElementsByTagName('h2')[0];
// Get text inside the h2 tag
var headingText = heading.innerHTML;
// add number of items to heading
heading.innerHTML = headingText + "<span>" + iTemsList.length + "</span>";