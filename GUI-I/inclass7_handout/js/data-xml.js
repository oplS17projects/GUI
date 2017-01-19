// NOTE: If you run this file locally
// You will not get a server status and the example will fail
// Comment out lines 9 and 35 if you are working locally

var xhr = new XMLHttpRequest();        // Create an XMLHttpRequest Object (xhr)

xhr.onload = function() {              // One the XML Object is loaded
 // The following conditional check will not work locally - only on a server
 // if (xhr.status === 200) {             // Check if the XML Object status === 200

  // THIS PART IS DIFFERENT BECAUSE IT IS PROCESSING XML NOT HTML
  var response = xhr.responseXML;                      // Create new XML object from the response
  var events = response.getElementsByTagName('event'); // Find <event> elements

  for (var i = 0; i < events.length; i++) {            // Do a loop through event elements
    var container, image, location, city, newline;      // Declare variables
    container = document.createElement('div');          // Create <div> element (container)
    container.className = 'event';                      // Add 'event' class attribute (class name)

    image = document.createElement('img');              // Create <img> element (map)
    image.setAttribute('src', getNodeValue(events[i], 'map'));
    image.setAttribute('alt', getNodeValue(events[i], 'location'));
    container.appendChild(image);

    location = document.createElement('p');             // Create location <p> element (data)
    city = document.createElement('b');
    newline = document.createElement('br');
    city.appendChild(document.createTextNode(getNodeValue(events[i], 'location')));
    location.appendChild(newline);
    location.insertBefore(city, newline);
    location.appendChild(document.createTextNode(getNodeValue(events[i], 'date')));
    container.appendChild(location);

    document.getElementById('content').appendChild(container);
  }
// }

  function getNodeValue(obj, tag) {                   // Gets content from the XML
    return obj.getElementsByTagName(tag)[0].firstChild.nodeValue;
  }

 // THE FINAL PART IS THE SAME AS THE HTML EXAMPLE BUT IT REQUESTS AN XML FILE
};

xhr.open('GET', 'data/data.xml', true);             // Prepare the request, in the HTMl format
xhr.send(null);                                     // Send the request