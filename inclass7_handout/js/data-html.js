// NOTE: If you run this file locally
// You will not get a server status and the example will fail
// Comment out lines 9 and 11 if you are working locally

var xhr = new XMLHttpRequest();                 // Create an XML Object (xhr)

xhr.onload = function() {                       // One the XML Object is loaded
  // The following conditional check will not work locally - only on a server
  if(xhr.status === 200) {                       // Check if the XML Object status === 200
    document.getElementById('content').innerHTML = xhr.responseText; // Update the XML HTML with the infromation was received
  }
};

xhr.open('GET', 'data/data.html', true);        // Prepare the request, in the HTMl format
xhr.send(null);                                 // Send the request