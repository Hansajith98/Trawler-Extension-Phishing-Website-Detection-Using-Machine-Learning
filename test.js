chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    var url = request;
    console.log(request);
    state = await checkUrl(url.message);
    let msg = String(state);
    console.log(msg);
    // Callback for that request
    sendResponse({ message: msg });
    
});


async function checkUrl(urlToSend) {
    let server_response = await fetch("http://127.0.0.1:5000/", {    
    // Adding method type 
    method: "POST",      
    // Adding body or contents to send 
    body: JSON.stringify({ 
        url : urlToSend
    }),      
    // Adding headers to the request 
    headers: { 
        "Content-type": "application/json; charset=UTF-8"
    }
})
//  // Converting to JSON 
.then(response => response.json())
// // Displaying results to console 
.then(json => {return String(json.state)}); 

    console.log(server_response);
    // message = String(server_response);
    message = "helllo"
    console.log(message);
    return message;
}